import React from "react";
import PropTypes from "prop-types";

import {default as OfferModel} from "../../model/OfferModel";
import Style from "./../layouts/OfferTableViewMobileLayout.scss";

export class FirstYearFeeItemRenderer extends React.PureComponent {
    
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel).isRequired
    }

    constructor(props) {
        super(props);
        this.firstYearFee = this.props.offer.getFirstYearFee();
    }

    render() {
        return <React.Fragment>
            <strong className={[Style.textValue, Style.textWithIcon, Style.offerSprite, Style["bbicons-rs-1"]].join(" ")}>${this.firstYearFee.getCurrentFee()}</strong>
            <div className={Style["textValue-scondary"]}>1<sup>st</sup> Year Fee</div>
        </React.Fragment>;
    }

    static requiredDomain() {
        return "firstYearFee";
    }
}