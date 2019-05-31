import React from "react";
import PropTypes from "prop-types";

import {default as OfferModel} from "../../model/OfferModel";

export class OneLinerItemRenderer extends React.PureComponent {
    
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel).isRequired
    }

    constructor(props) {
        super(props);
        this.usp = this.props.offer.getUsp();
    }

    render() {
        return <span>{this.usp.getUSPText()} </span>;
    }
}