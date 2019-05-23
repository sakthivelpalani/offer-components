import React from "react";
import PropTypes from "prop-types";

import CreditCard from "../../domain/CreditCard";

export class CreditCardNameItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.instanceOf(CreditCard)
    }

    render() {
        return <a href={"/credit-card/" + this.props.domain.getName()}> {this.props.domain.getDisplayName()} </a>;
    }
}

export class CreditCardImageItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.instanceOf(CreditCard)
    }

    render() {
        //Return image.
        return <img src="https://bankbazaar.com/images/india/cc-images/small/indusind-bank-jet-airways-voyage-visa-credit-card.png"/>;
    }
}