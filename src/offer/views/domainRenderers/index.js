import React from "react";

export function reactElementForRendererViewKlass(viewKlass, offer) {
    return React.createElement(viewKlass, { offer : offer });
}

import * as ReviewsSummary from "./ReviewsSummary";
import * as CreditCard from "./CreditCard";
import * as CreditCardAnnualFee from "./CreditCardAnnualFee";
import * as Usp from "./Usp";

export {ReviewsSummary};
export {CreditCard};
export {CreditCardAnnualFee};
export {Usp};