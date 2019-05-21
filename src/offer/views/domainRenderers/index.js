import React from 'react';

import {BankColumnRenderer} from "./Bank";
import {InterestRateColumnRenderer} from "./InterestRate";
import {ProcessingFeeColumnRenderer} from "./ProcessingFee";
import {LoanAmountColumnRenderer} from "./LoanAmount";
import {TenureColumnRenderer} from "./Tenure";

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