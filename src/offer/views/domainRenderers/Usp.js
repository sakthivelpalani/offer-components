import React from "react";
import PropTypes from "prop-types";

import Usp from "../../domain/Usp.js";

export class OneLinerItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.instanceOf(Usp).isRequired
    }

    render() {
        return <span>{this.props.domain.getUSPText()} </span>;
    }
}