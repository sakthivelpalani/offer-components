export default class CreditCardAnnualFee {

    constructor(creditCardAnnualFee) {
        this.creditCardAnnualFee = creditCardAnnualFee;
    }

    getCurrentFee() {
        return this.creditCardAnnualFee.fees.value;
    }

    getConditionForFee() {
        return this.creditCardAnnualFee.conditions;
    }

    getType() {
        return "CreditCardAnnualFee";
    }

}