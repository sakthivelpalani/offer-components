import React from 'react';

import {BankColumnRenderer} from "./Bank";
import {InterestRateColumnRenderer} from "./InterestRate";
import {ProcessingFeeColumnRenderer} from "./ProcessingFee";
import {LoanAmountColumnRenderer} from "./LoanAmount";
import {TenureColumnRenderer} from "./Tenure";

import * as ReviewsSummary from "./ReviewsSummary";
import * as CreditCard from "./CreditCard";
import * as CreditCardAnnualFee from "./CreditCardAnnualFee";
import * as Rewards from "./Rewards";

import Logger from "../../../helpers/Logger"

const columnRenderers = {
    "Bank": BankColumnRenderer,
    "InterestRate" : InterestRateColumnRenderer,
    "ProcessingFee": ProcessingFeeColumnRenderer,
    "LoanAmount": LoanAmountColumnRenderer,
    "Tenure": TenureColumnRenderer
};

 export function ColumnRendererForDomain(domain) {
    const domainType = domain.getType();

    const viewKlass = columnRenderers[domainType];
    return React.createElement(viewKlass, { domain : domain });
}

const itemRenderers = {
    "CreditCard_Name": CreditCard.NameItemRenderer,
    "CreditCard_Image": CreditCard.ImageItemRenderer,
    "AnnualFee_FirstYear": CreditCardAnnualFee.FirstYearFeeItemRenderer,
    "Rewards_OneLiner": Rewards.OneLinerItemRenderer,
    "ReviewsSummary_Rating": ReviewsSummary.RatingItemRenderer
};

export function getItemRendererFor(itemType, offer) {
    const viewKlass = itemRenderers[itemType];
    
    const domainType = viewKlass.requiredDomain && viewKlass.requiredDomain();
    const domain = domainType && offer.get(domainType);

    if(!domain) {
        Logger.error("Unable to find domain for renderer " + viewKlass.name);
    }

    return React.createElement(viewKlass, { domain : domain });

}