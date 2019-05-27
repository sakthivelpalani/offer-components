import React from 'react';

import {BankColumnRenderer} from "./Bank";
import {InterestRateColumnRenderer} from "./InterestRate";
import {ProcessingFeeColumnRenderer} from "./ProcessingFee";
import {LoanAmountColumnRenderer} from "./LoanAmount";
import {TenureColumnRenderer} from "./Tenure";

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

export function reactElementForRendererViewKlass(viewKlass, offer) {
    const domainType = viewKlass.requiredDomain && viewKlass.requiredDomain();
    const domain = domainType && offer.get(domainType);

    if(!domain) {
        Logger.error("Unable to find domain for renderer " + viewKlass.name);
    }

    return React.createElement(viewKlass, { domain : domain });
}

import * as ReviewsSummary from "./ReviewsSummary";
import * as CreditCard from "./CreditCard";
import * as CreditCardAnnualFee from "./CreditCardAnnualFee";
import * as Rewards from "./Rewards";

export {ReviewsSummary};
export {CreditCard};
export {CreditCardAnnualFee};
export {Rewards};