import React from "react";
import PropTypes from "prop-types";

import {default as OfferModel} from "../../model/OfferModel";
import Style from "./../layouts/OfferTableViewMobileLayout.scss";

export class NameItemRenderer extends React.PureComponent {
    
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel).isRequired
    }

    constructor(props) {
        super(props);
        this.cardName = this.props.offer.getCardName();
        this.cardUrl = this.props.offer.getCardUrl();
    }

    render() {
        const cardName = this.cardName.getText();
        if (this.cardUrl == undefined) {
            return <a className={Style.title}>{cardName}</a>;
        }
        const linkValue = "/credit-card/" + this.cardUrl.getText() + ".html"; 
        return <a className={Style.title} href={linkValue}> {cardName} </a>;
    }
}

export class ImageItemRenderer extends React.PureComponent {
    
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel).isRequired
    }

    render() {
        //Return image.
        return <img src="https://bankbazaar.com/images/india/cc-images/small/indusind-bank-jet-airways-voyage-visa-credit-card.png"/>;
    }
}