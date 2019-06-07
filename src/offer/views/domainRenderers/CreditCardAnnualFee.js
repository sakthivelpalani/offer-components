import React from "react";
import PropTypes from "prop-types";

import CreditCardAnnualFee from "../../domain/CreditCardAnnualFee.js";

export class FirstYearFeeItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.shape({
            firstYearFee: PropTypes.instanceOf(CreditCardAnnualFee).isRequired,
            reducedFee: PropTypes.instanceOf(CreditCardAnnualFee)
        }).isRequired
    }

    render() {
        return <div>
            ${this.props.domain.firstYearFee.getCurrentFee()} <br />
            1st YEAR FEE
        </div>;
    }
}

export class GenericFeeRenderer extends React.PureComponent {
    static propTypes = {
        domain: PropTypes.instanceOf(CreditCardAnnualFee).isRequired
    }

    render() {
        return <div>
            ${this.props.domain.getCurrentFee()} <br />
        </div>;
    }
}