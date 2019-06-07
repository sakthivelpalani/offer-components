import React from "react";

export function reactElementForRendererViewConfig(viewKlassConfig, offer) {
    return React.createElement(viewKlassConfig.renderer, { domain : viewKlassConfig.getDomain(offer) });
}

import * as ReviewsSummary from "./ReviewsSummary";
import * as CreditCard from "./CreditCard";
import * as CreditCardAnnualFee from "./CreditCardAnnualFee";
import * as Usp from "./Usp";

export const RatingItemRenderer = {
    renderer: ReviewsSummary.RatingItemRenderer,
    getDomain: (offerModel) => offerModel.getReviewsSummary()
};
export const CreditCardImageItemRenderer = {
    renderer: CreditCard.ImageItemRenderer,
    getDomain: (offerModel) => offerModel.getCardUrl()
};
export const CreditCardNameItemRenderer = {
    renderer: CreditCard.NameItemRenderer,
    getDomain: (offerModel) => {
        return {
            cardName: offerModel.getCardName(),
            cardUrl: offerModel.getCardUrl()
        };
    }
};
export const CreditCardFirstYearAndReducedFeeItemRenderer = {
    renderer: CreditCardAnnualFee.FirstYearFeeItemRenderer,
    getDomain: (offerModel) => {
        return {
            firstYearFee: offerModel.getFirstYearFee(),
            reducedFee: offerModel.getReducedFee()
        };
    }
};
export const CreditCardSecondYearFeeItemRenderer = {
    renderer: CreditCardAnnualFee.GenericFeeRenderer,
    getDomain: (offerModel) => offerModel.getSecondYearOnwards()
};
export const UspOneLineRenderer = {
    renderer: Usp.OneLinerItemRenderer,
    getDomain: (offerModel) => offerModel.getUsp()
};
