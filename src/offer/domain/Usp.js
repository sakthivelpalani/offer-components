export default class Usp {

    constructor(usp) {
        this.usp = usp;
    }

    getUSPText() {
        return this.usp && this.usp.value;
    }

    getUSPCategory() {
        return this.usp && this.usp.type;
    }
    
    getType() {
        return "USP";
    } 
}