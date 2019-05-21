import React from "react";
import PropTypes from "prop-types";

import ProcessingFee from "../../domain/ProcessingFee";

 export class ProcessingFeeColumnRenderer extends React.PureComponent {

     static props = {
        domain: PropTypes.instanceOf(ProcessingFee)
    }

     render() {
        return (
            <div>
                {this.props.domain.getValueAsText()}
                <br/>
                {this.props.domain.getAdditionalText()}
            </div>
        );
    }
} 