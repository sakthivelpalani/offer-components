export default class InterestRate {

    constructor(interestRate) {
        this.interestRate = interestRate;
    }

    getMinPercentage() {
        return this.interestRate.minPercentage;
    }

    getMaxPercentage() {
        return this.interestRate.maxPercentage;
    }

    getInterestRateType() {
        return this.interestRate.type;
    }

    getType() {
        return "InterestRate";
    }
 
}