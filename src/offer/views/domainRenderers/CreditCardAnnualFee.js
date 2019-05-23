import React from "react";
import PropTypes from "prop-types";

import CreditCardAnnualFee from "../../domain/CreditCardAnnualFee";

export class FirstYearFeeItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.instanceOf(CreditCardAnnualFee)
    }

    render() {
        return <div>
            ${this.props.domain.getFirstYearFee()} <br />
            1st YEAR FEE
            </div>;
    }

    static requiredDomain() {
        return "CreditCardAnnualFee";
    }
}