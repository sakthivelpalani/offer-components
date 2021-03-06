import React from "react";
import PropTypes from "prop-types";

import Rewards from "../../domain/Rewards";

export class OneLinerItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.instanceOf(Rewards)
    }

    render() {
        return <span>{this.props.domain.getOneLinerRewardText()} </span>;
    }

    static requiredDomain() {
        return "Rewards";
    }
}