export default class ProcessingFee {

    constructor(processingFee) {
        this.processingFee = processingFee;
    }

    getMaxPercentage() {
        return this.processingFee.maxPercentage;
    }

    isBankbazaarExclusive() {
        return this.processingFee.bankbazaarExclusive === true;
    }

    getAbsoluteValue() {
        return this.processingFee.value;
    }

    getValueAsText() {
        let text = "NA";
        if (this.getAbsoluteValue() !== undefined) {
            text = this.getAbsoluteValue();
        } else if (this.getMaxPercentage() != undefined) {
            text = "upto " + this.getMaxPercentage() + "%";
        }

        return text;
    }

    getAdditionalText() {
        let subText = "one time fee";
        if (this.isBankbazaarExclusive()) {
            subText = "Bankbazaar Exclusive";
        }

        return subText;
    }

    getType() {
        return "ProcessingFee";
    }
 
}