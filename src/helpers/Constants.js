import Enum from "enum";

export const DeviceType = new Enum({
    DESKTOP: "desktop",
    MOBILE: "mobile",
    TABLET: "tablet"
});

export const ProductTypeCategory = new Enum({
    LOAN: "LOAN",
    INSURANCE: "INSURANCE",
    INVESTMENT: "INVESTMENT",
    BANKACCOUNT: "BANK_ACCOUNT",
    CREDITCARD: "CREDIT_CARD",
    CREDITREPORT: "CREDIT_REPORT"
});

export const ProductType = new Enum({
    HL: {longCode: "Home_Loan", namespace: "home-loan", category: ProductTypeCategory.LOAN},
    CL: {longCode: "Car_Loan", namespace: "car-loan", category: ProductTypeCategory.LOAN},
    PL: {longCode: "Personal_Loan", namespace: "personal-loan", category: ProductTypeCategory.LOAN},
    CC: {longCode: "Credit_Card", namespace: "credit-card", category: ProductTypeCategory.CREDITCARD},
    DC: {longCode: "Debit_Card", namespace: "debit-card", category: ProductTypeCategory.BANKACCOUNT},
    SA: {longCode: "Saving_Account", namespace: "savings-account", category: ProductTypeCategory.BANKACCOUNT},
    FD: {longCode: "Fixed_Deposit", namespace: "fixed-deposit", category: ProductTypeCategory.INVESTMENT},
    CI: {longCode: "Car_Insurance", namespace: "car-insurance", category: ProductTypeCategory.INSURANCE},
    TWI: {longCode: "Two_Wheeler_Insurance", namespace: "two-wheeler-insurance", category: ProductTypeCategory.INSURANCE},
    HI: {longCode: "Health_Insurance", namespace: "health-insurance", category: ProductTypeCategory.INSURANCE},
    TLI: {longCode: "Term_Life_Insurance", namespace: "life-insurance", category: ProductTypeCategory.INSURANCE},
    MF: {longCode: "Mutual_Fund", namespace: "mutual-fund", category: ProductTypeCategory.INVESTMENT},
    CT: {longCode: "Credit_Report", namespace: "credit-report", category: ProductTypeCategory.CREDITREPORT},
    ALL: {longCode: "NA", namespace: "NA", category: "NA"}
});