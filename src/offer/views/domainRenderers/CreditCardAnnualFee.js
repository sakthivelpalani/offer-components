import React from "react";
import PropTypes from "prop-types";

import {default as OfferModel} from "../../model/OfferModel";

export class FirstYearFeeItemRenderer extends React.PureComponent {
    
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel).isRequired
    }

    constructor(props) {
        super(props);
        this.firstYearFee = this.props.offer.getFirstYearFee();
    }

    render() {
        return <div>
            ${this.firstYearFee.getCurrentFee()} <br />
            1st YEAR FEE
        </div>;
    }

    static requiredDomain() {
        return "firstYearFee";
    }
}