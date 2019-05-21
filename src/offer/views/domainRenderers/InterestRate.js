import React from "react";
import PropTypes from "prop-types";

 import InterestRate from "../../domain/InterestRate";

 export class InterestRateColumnRenderer extends React.PureComponent {

     static props = {
        domain: PropTypes.instanceOf(InterestRate)
    }

     render() {
        return (
            <div>
                {this.props.domain.getMinPercentage()} % - {this.props.domain.getMaxPercentage()} %
                <br/>
                {this.props.domain.getInterestRateType()}
            </div>
        );
    }
} 