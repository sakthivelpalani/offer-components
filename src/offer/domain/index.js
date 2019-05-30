import Bank from "./Bank";
import TextAndAdditionalInfo from "./TextAndAdditionalInfo.js";
import SimpleString from "./SimpleString.js";
import CreditCardAnnualFee from "./CreditCardAnnualFee";
import ReviewsSummary from "./ReviewsSummary";
import Usp from "./Usp";
import CardCategoryList from "./CardCategoryList";

import Logger from "../../helpers/Logger";

const domains = {
    Bank,
    TextAndAdditionalInfo,
    SimpleString,
    CreditCardAnnualFee,
    ReviewsSummary,
    Usp,
    CardCategoryList
};

const domainOverrides = {
    "CardName": TextAndAdditionalInfo,
    "CardUrl": SimpleString,
    "FirstYearFee": CreditCardAnnualFee
};

export function getDomainKlass(domainType) {
    const domainKlass = domainOverrides[domainType] || domains[domainType];

    if (!domainKlass) {
        Logger.error("Unable to find a domain for modelKey: " + domainType);
        return undefined;
    } else {
        return domainKlass;
    }
}
