import React from "react";
import PropTypes from "prop-types";

import CreditCard from "../../domain/CreditCard";
import TextAndAdditionalInfo from "../../domain/TextAndAdditionalInfo";

export class NameItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.instanceOf(TextAndAdditionalInfo)
    }

    render() {
        return <a href={"/credit-card/" + this.props.domain.getText()}> {this.props.domain.getText()} </a>;
    }

    static requiredDomain() {
        return "CardName";
    }
}

export class ImageItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.instanceOf(CreditCard)
    }

    render() {
        //Return image.
        return <img src="https://bankbazaar.com/images/india/cc-images/small/indusind-bank-jet-airways-voyage-visa-credit-card.png"/>;
    }

    static requiredDomain() {
        return "CreditCard";
    }
}