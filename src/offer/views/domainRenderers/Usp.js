import React from "react";
import PropTypes from "prop-types";

import {default as OfferModel} from "../../model/OfferModel";
import Style from "./../layouts/OfferTableViewMobileLayout.scss";

export class OneLinerItemRenderer extends React.PureComponent {
    
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel).isRequired
    }

    constructor(props) {
        super(props);
        this.usp = this.props.offer.getUsp();
    }

    render() {
        return <span className={[Style.usp, Style.textWithIcon, Style.offerSprite, Style["bbicons-travel-card"]].join(" ")}>{this.usp.getUSPText()} </span>;
    }
}