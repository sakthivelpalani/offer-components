export default class LoanAmount {

    constructor(loanAmount) {
        this.loanAmount = loanAmount;
    }

    getMinAmount() {
        return this.loanAmount.min;
    }

    getMaxAmount() {
        return this.loanAmount.max;
    }

    getType() {
        return "LoanAmount";
    }

}