import React from "react";
import PropTypes from "prop-types";

import Usp from "../../domain/Usp";

export class OneLinerItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.instanceOf(Usp)
    }

    render() {
        return <span>{this.props.domain.getUSPText()} </span>;
    }

    static requiredDomain() {
        return "Usp";
    }
}