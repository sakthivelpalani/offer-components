export default class CreditCardAnnualFee {

    constructor(fee) {
        this.fee = fee;
    }

    getFirstYearFee() {
        return this.fee.firstYearFee.value;
    }

    getFirstYearReducedFee() {
        return this.fee.firstYearFee.reducedValue;
    }

    getConditionForFirstYearReducedFee() {
        return this.fee.firstYearFee.conditionsForReducedValue;
    }

    getSecondYearOnwardsFee() {
        return this.fee.secondYearOnwardsFee;
    }

    getType() {
        return "CreditCardAnnualFee";
    }

}