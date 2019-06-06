import React from "react";
import PropTypes from "prop-types";
import {find} from "lodash";

import getViewConfiguration from "../Config.js";
import OffersModel from "../../model/OffersModel.js";
import FilterChain from "../../domain/filters/FilterChain.js";
import "./../../../styles/filter/FilterContainerMobileLayout.scss";

export default class FilterContainerMobileLayout extends React.PureComponent {
    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        onFilter: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        const filterRendererConfigs = getViewConfiguration(this.props.offersModel.context.getProductType())["filters"];
        const filterableDomains = filterRendererConfigs.map((filterRendererConfig) => {
            return new filterRendererConfig.domain([]);
        });
        
        this.state = {
            filterableDomains
        };
    }
    
    render() {
        
        const filterRendererConfigs = getViewConfiguration(this.props.offersModel.context.getProductType())["filters"];
        const filterRendererComponents = filterRendererConfigs.map((filterRendererConfig, i) => {
            const filterableDomain = find(this.state.filterableDomains, 
                (filterableDomain) => {
                    return filterableDomain instanceof filterRendererConfig.domain;
                });
            const onFilterChange = (selectedValues) => {
                this.updateSelectionOfFilterableDomain(filterableDomain, selectedValues);
            };
            return React.createElement(filterRendererConfig.renderer, {
                options: filterableDomain.getFilterOptions(this.props.offersModel),
                onChange: onFilterChange,
                selectedOptions: filterableDomain.filterCriteria,
                key: i,
                ...filterRendererConfig.props
            });
        });
        return <div className="filterSection">
            <div className="filterTitle filterSpriteTextWithIcon bbiconsGoBack">Go Back</div>
            <ul>
                {filterRendererComponents}
            </ul>
            <div className="filterControl">
                <a className="btn btnLeft filterSpriteTextWithIcon bbiconsClearFilter" name="Reset" onClick={this.onResetClick}>Clear Filter</a>
                <a className="btn btnRight filterSpriteTextWithIcon bbiconsApplyFilter" name="Filter" onClick={this.onFilterClick}>Apply Filter</a>
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