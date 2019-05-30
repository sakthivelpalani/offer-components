import React from "react";
import PropTypes from "prop-types";

import CreditCardAnnualFee from "../../domain/CreditCardAnnualFee";

export class FirstYearFeeItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.instanceOf(CreditCardAnnualFee)
    }

    render() {
        return <div>
            ${this.props.domain.getCurrentFee()} <br />
            1st YEAR FEE
        </div>;
    }

    static requiredDomain() {
        return "FirstYearFee";
    }
}