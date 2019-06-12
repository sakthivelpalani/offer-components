import React from "react";
import PropTypes from "prop-types";

import TextAndAdditionalInfo from "../../domain/TextAndAdditionalInfo.js";
import SimpleString from "../../domain/SimpleString.js";
import Style from "./../../../styles/defaultLayout/CreditCard.scss";

export class NameItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.shape({
            cardName: PropTypes.instanceOf(TextAndAdditionalInfo).isRequired,
            cardUrl: PropTypes.instanceOf(SimpleString)
        })
    }

    render() {
        const cardName = this.props.domain.cardName.getText();
        if (this.props.domain.cardUrl == undefined) {
            return <a className={Style.title}>{cardName}</a>;
        }
        const linkValue = "/credit-card/" + this.props.domain.cardUrl.getText() + ".html"; 
        return <a className={Style.title} href={linkValue}> {cardName} </a>;
    }
}

export class ImageItemRenderer extends React.PureComponent {
    
    static propTypes = {
        domain: PropTypes.instanceOf(SimpleString)
    }

    render() {
        //Return image.
        return <img src="https://bankbazaar.com/images/india/cc-images/small/indusind-bank-jet-airways-voyage-visa-credit-card.png"/>;
    }
}