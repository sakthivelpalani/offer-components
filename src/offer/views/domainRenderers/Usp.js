import React from "react";
import PropTypes from "prop-types";

import Usp from "../../domain/Usp.js";
import Style from "./../layouts/OfferTableViewMobileLayout.scss";

export class OneLinerItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.instanceOf(Usp).isRequired
    }

    render() {
        return <span className={[Style.usp, Style.textWithIcon, Style.offerSprite, Style.bbiconsTravelCard].join(" ")}>{this.props.domain.getUSPText()} </span>;
    }
}