import React from "react";
import PropTypes from "prop-types";

import LoanAmount from "../../domain/LoanAmount";

 export class LoanAmountColumnRenderer extends React.PureComponent {

     static props = {
        domain: PropTypes.instanceOf(LoanAmount)
    }

     render() {
        let displayText = ""; 
        if (this.props.domain.getMaxAmount() !== undefined && this.props.domain.getMinAmount() !== undefined) {
            displayText = this.props.domain.getMinAmount() + " - " +  this.props.domain.getMaxAmount();
        } else if (this.props.domain.getMinAmount() !== undefined) {
            displayText = "Min " +  this.props.domain.getMinAmount();
        } else {
            displayText = this.props.domain.getMaxAmount() + " Max";
        }

         return <div>{displayText}</div>;
    }
} 