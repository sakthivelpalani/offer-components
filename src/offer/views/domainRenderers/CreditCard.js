import React from "react";
import PropTypes from "prop-types";

import TextAndAdditionalInfo from "../../domain/TextAndAdditionalInfo";
import SimpleString from "../../domain/SimpleString";

export class NameItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.shape({
            CardName: PropTypes.instanceOf(TextAndAdditionalInfo).isRequired,
            CardUrl: PropTypes.instanceOf(SimpleString)
        }).isRequired
    }

    render() {
        const cardName = this.props.domain["CardName"].getText();
        if (this.props.domain.CardUrl == undefined) {
            return <a>{cardName}</a>;
        }
        const linkValue = "/credit-card/" + this.props.domain["CardUrl"].getText() + ".html"; 
        return <a href={linkValue}> {cardName} </a>;
    }

    static requiredDomain() {
        return ["CardName", "CardUrl"];
    }
}

export class ImageItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.instanceOf(TextAndAdditionalInfo)
    }

    render() {
        //Return image.
        return <img src="https://bankbazaar.com/images/india/cc-images/small/indusind-bank-jet-airways-voyage-visa-credit-card.png"/>;
    }

    static requiredDomain() {
        return "CardName";
    }
}