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
            <section className={Style.offer} key={`row-${offer.getId()}`}>
                <div className={Style.offerTopSection}>
                    <span className={Style.offerImageSection}>
                        <Checkbox value={offer.getId()} onChange={compareCheckHandler} />
                        {getLogoRenderer(config, offer)}
                        {getRatingsRenderer(config, offer)}
                    </span>
                    {getRowsRenderer(config, offer)}
                    <div> 
                        {this.renderCTAButton()}
                    </div>
                </div>
            </section>
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
        //<div className={Style.offerSection}>{offerRows}</div>
            <div className={Style.offerSection}>
                <div className={[Style.editAppContainer, Style.container, Style.filterSticky].join(" ")}>
                    <div className={Style.filterStickyContainer}>
                        <div className={Style.offerCountInfo}>We found 14 Credit Cards<span onClick={this.showFilter} className={[Style.filterBtn, Style.textWithIcon, Style.offerSprite, Style["bbicons-filter"]].join(" ")}>Filter</span></div>
                    </div>
                </div>
                <div className="modal filterModal" style={!this.state.filterShown ? {display: "none"}: {}}>
                    {filterContainer}
                </div>
                {offerRowsComponent}
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
            <a className={Style.offerButton} onClick={this.applyNowHandler}>
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
            <div className={[`row-${rowNumber}`, Style.row].join(" ")}>
                {itemsDiv}
            </div>
        ));
    });

    return rows;
};