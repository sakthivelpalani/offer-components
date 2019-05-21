export default class Tenure {

    constructor(tenure) {
        this.tenure = tenure;
    }

    getMaxYears() {
        return this.tenure.max;
    }

    getMinYears() {
        return this.tenure.min;
    }

    getType() {
        return "Tenure";
    }
}
