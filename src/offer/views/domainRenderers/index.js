import React from 'react';
import Logger from "../../../helpers/Logger";

export function reactElementForRendererViewKlass(viewKlass, offer) {
    const domainType = viewKlass.requiredDomain && viewKlass.requiredDomain();
    let domain;
    if(Array.isArray(domainType)) {
        domain = domainType.reduce((aggr, domainType)=> {
            aggr[domainType] = offer.get(domainType);
            return aggr;
        }, {})
    } else {
        domain = domainType && offer.get(domainType);
    }
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