import React from "react";
import PropTypes from "prop-types";
import {filter, concat} from "lodash";

import OffersModel from "../../model/OffersModel";
import Context from "../../../helpers/Context.js";
import FilterContainerMobileLayout from "./FilterContainerMobileLayout.js";
import {reactElementForRendererViewConfig} from "../domainRenderers";
import Checkbox from "../../../controls/Checkbox.js";
import Style from "./OfferTableViewMobileLayout.scss";

export default class OfferTableViewMobileLayout extends React.PureComponent  {

    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        context: PropTypes.instanceOf(Context).isRequired,
        viewConfiguration: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            filteredOffersModel: this.props.offersModel,
            filterShown: false,
            offerIdsToBeCompared: []
        };
    }

    renderOfferRow(offer) {
        const config = this.props.viewConfiguration["visibleItems"];
        const compareCheckHandler = (e, data) => {
            this.onCompareCheckChange(offer, data.checked);
        };
        return (
            <div key={`row-${offer.getId()}`}>
                <Checkbox value={offer.getId()} onChange={compareCheckHandler} />
                {getLogoRenderer(config, offer)}
                {getRatingsRenderer(config, offer)}
                {getRowsRenderer(config, offer)}
                <div> 
                    {this.renderCTAButton()}
                </div>
            </div>
        );
    }

    render() {
        const offerRows = [];
        this.state.filteredOffersModel.getOffersMap().forEach((offer) => {
            offerRows.push(this.renderOfferRow(offer));
        });
        const offerRowsComponent =  <div className={Style.offerSection}>{offerRows}</div>;
        const filterContainer = <FilterContainerMobileLayout 
            offersModel={this.props.offersModel}
            onFilter={this.onFilter}/>;
        return (
            <div>
                <button onClick={this.showFilter}>Filter</button>
                <div style={!this.state.filterShown ? {display: "none"}: {}}>
                    {filterContainer}
                </div>
                <div style={this.state.filterShown ? {display: "none"}: {}}>
                    {offerRowsComponent}
                </div>
            </div>
        );
    }

    onFilter = (filteredOffersModel) => {
        this.setState({filteredOffersModel, filterShown: false});
    }

    onCompareCheckChange = (offer, checked) => {
        let newOfferIdsToBeCompared;
        if (checked) {
            newOfferIdsToBeCompared  = concat(this.state.offerIdsToBeCompared, offer.getId());
        } else {
            newOfferIdsToBeCompared  = filter(this.state.offerIdsToBeCompared, (offerId) => offer.getId() != offerId);
        }
        this.setState({offerIdsToBeCompared: newOfferIdsToBeCompared});
    }

    showFilter = () => {
        this.setState({filterShown: true});
    }

    renderCTAButton() {
        return (
            <a onClick={this.applyNowHandler}>
                    APPLY NOW
            </a>
        );
    }

    applyNowHandler() {
        //implement this
        return;
    }

} 

const getLogoRenderer = function(config, offer) {
    return reactElementForRendererViewConfig(config.logoRenderer, offer);
};

const getRatingsRenderer = function(config, offer) {
    return reactElementForRendererViewConfig(config.ratingsRenderer, offer);
};

const getRowsRenderer = function(config, offer) {
    const rows = [];
    Object.entries(config.rowRenderers).forEach(function([rowNumber, itemTypes]) {
        const itemsDiv = itemTypes.map((itemType) => {
            return (<div key={rowNumber}>{reactElementForRendererViewConfig(itemType, offer)}</div>);
        });
        rows.push((
            <div className={`row-${rowNumber}`} key={rowNumber}>
                {itemsDiv}
            </div>
        ));
    });

    return rows;
};