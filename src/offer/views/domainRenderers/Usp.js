import React from "react";
import PropTypes from "prop-types";

import Usp from "../../domain/Usp.js";
import Style from "./../../../styles/defaultLayout/usp.scss";

export class OneLinerItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.instanceOf(Usp).isRequired
    }

    render() {
        return <span className={[Style.usp, Style.symbolTravelCard].join(" ")}>{this.props.domain.getUSPText()} </span>;
        // ToDo: Need to make the USP type class name in configurable Ex: symbolTravelCard.
    }
}