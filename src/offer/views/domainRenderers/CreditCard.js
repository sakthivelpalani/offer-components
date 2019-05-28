import React from "react";
import PropTypes from "prop-types";

import CreditCard from "../../domain/CreditCard";
import {TextAndAdditionalInfo, SimpleString} from "../../domain/index.js";

export class NameItemRenderer extends React.PureComponent {
    
    static props = {
        domain: PropTypes.shape({
            "CardName": PropTypes.instanceOf(TextAndAdditionalInfo),
            "CardUrl": PropTypes.instanceOf(SimpleString)
        })
    }

    render() {
        return <a href={"/credit-card/" + this.props.domain["CardUrl"].getText() + ".html"}> {this.props.domain["CardName"].getText()} </a>;
    }

    static requiredDomain() {
        return ["CardName", "CardUrl"];
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