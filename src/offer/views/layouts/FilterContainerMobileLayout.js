import React from "react";
import PropTypes from "prop-types";
import {find} from "lodash";

import getViewConfiguration from "../Config.js";
import OffersModel from "../../model/OffersModel.js";
import {filterDomainMappings} from "../domainRenderers/filters/index.js";
import FilterChain from "../../domain/filters/FilterChain.js";

export default class FilterContainerMobileLayout extends React.PureComponent {
    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        onFilter: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        const filterRendererClasses = getViewConfiguration(this.props.offersModel.context.getProductType())["filters"];
        const filterableDomains = filterRendererClasses.map((filterRendererClass) => {
            return new filterDomainMappings[filterRendererClass.name]([]);
        });
        
        this.state = {
            filterableDomains
        };
    }
    
    render() {
        
        const filterRendererClasses = getViewConfiguration(this.props.offersModel.context.getProductType())["filters"];
        const filterRendererComponents = filterRendererClasses.map((filterRendererClass, i) => {
            const filterableDomain = find(this.state.filterableDomains, 
                (filterableDomain) => {
                    return filterableDomain instanceof filterDomainMappings[filterRendererClass.name];
                });
            const onFilterChange = (selectedValues) => {
                this.updateSelectionOfFilterableDomain(filterableDomain, selectedValues);
            };
            return React.createElement(filterRendererClass, {
                options: filterableDomain.getFilterOptions(this.props.offersModel),
                onChange: onFilterChange,
                selectedOptions: filterableDomain.filterCriteria,
                key: i
            });
        });
        return <div className="filterSection">
            <div className="filterTitle"><span className="iconWidth filterSprite spriteGoBack"></span>Go Back</div>
            <ul>
                {filterRendererComponents}
            </ul>
            <div className="filterControl">
                <a className="btn btnLeft" name="Reset" onClick={this.onResetClick}><span className="iconWidth filterSprite spriteClearFilter"></span>Clear Filter</a>
                <a className="btn btnRight" name="Filter" onClick={this.onFilterClick}><span className="iconWidth filterSprite spriteApplyFilter"></span>Apply Filter</a>
            </div>
        </div>;
    }

    onFilterClick = () => {
        invokeFilterChain(this.state.filterableDomains, this.props.offersModel, this.props.onFilter);        
    }

    onResetClick = () => {
        const filterableDomains = this.state.filterableDomains.map((filterableDomain) => {
            filterableDomain.setSelectedValues([]);
            return filterableDomain;
        });
        this.setState({filterableDomains});
        invokeFilterChain(filterableDomains, this.props.offersModel, this.props.onFilter);        
    }

    updateSelectionOfFilterableDomain = (changedFilterableDomain, selectedValues) => {
        const updatedFilterableDomains = this.state.filterableDomains.map((filterableDomainInState) => {
            if (filterableDomainInState == changedFilterableDomain) {
                filterableDomainInState.setSelectedValues(selectedValues);
            }
            return filterableDomainInState;
        });
        this.setState({filterableDomains: updatedFilterableDomains});
    }
}

const invokeFilterChain = (filterableDomains, offersModel, callback) => {
    return new FilterChain(filterableDomains).doFilter(offersModel).then((filteredOffersModel) => callback(filteredOffersModel));
};