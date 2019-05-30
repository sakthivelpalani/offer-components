import React from "react";
import PropTypes from "prop-types";

import Tenure from "../../domain/Tenure";

export class TenureColumnRenderer extends React.PureComponent {

     static propTypes = {
         domain: PropTypes.instanceOf(Tenure)
     }

     render() {
         let displayText = "";
         if (this.props.domain.getMinYears() !== undefined) {
             displayText = this.props.domain.getMinYears() + " - " + this.props.domain.getMaxYears() + " " + "years";
         } else {
             displayText = this.props.domain.getMaxYears() + " " + "years";
         }

         return <div>{displayText}</div>;
     }
} 
