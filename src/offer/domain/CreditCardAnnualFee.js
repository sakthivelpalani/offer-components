export default class CreditCardAnnualFee {

    constructor(creditCardAnnualFee) {
        this.creditCardAnnualFee = creditCardAnnualFee;
    }

    getCurrentFee() {
        if (this.creditCardAnnualFee.fees != undefined) {
            return this.creditCardAnnualFee.fees.value;
        } 
        return "";
    }

    getConditionForFee() {
        return this.creditCardAnnualFee.conditions;
    }

    getType() {
        return "CreditCardAnnualFee";
    }

}