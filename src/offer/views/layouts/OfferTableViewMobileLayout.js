import React from "react";
import PropTypes from "prop-types";

import OffersModel from "../../model/OffersModel";
import Context from "../../../helpers/Context.js";
import {reactElementForRendererViewKlass} from "../domainRenderers";
import Style from "./OfferTableViewMobileLayout.scss";

export default class OfferTableViewMobileLayout extends React.PureComponent  {

    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        context: PropTypes.instanceOf(Context).isRequired,
        viewConfiguration: PropTypes.object.isRequired
    }

    renderOfferRow(offer) {
        const config = this.props.viewConfiguration["visibleItems"];

        function getLogoRenderer(){
            return reactElementForRendererViewKlass(config.logoRenderer, offer);
        }

        function getRatingsRenderer(){
            return reactElementForRendererViewKlass(config.ratingsRenderer, offer);
        }

        function getRowsRenderer() {
            const rows = [];
            Object.entries(config.rowRenderers).forEach(function([rowNumber, itemTypes]) {
                const itemsDiv = itemTypes.map((itemType) => reactElementForRendererViewKlass(itemType, offer));
                rows.push((
                    <div className={`row-${rowNumber}`}>
                        {itemsDiv}
                    </div>
                ));
            })

            return rows;
        }

        return (
            <div key={`row-${offer.getId()}`}>
                {getLogoRenderer()}
                {getRatingsRenderer()}
                {getRowsRenderer()}
                <div> 
                    {this.renderCTAButton()}
                </div>
            </div>
        );
    }

    render() {
        const offerRows = [];
        this.props.offersModel.getOffersMap().forEach((offer) => {
            offerRows.push(this.renderOfferRow(offer));
        });

        return (
            <div className={Style.offerSection}>{offerRows}</div>
        );
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
