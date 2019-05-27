export default class CreditCard {

    constructor(card) {
        this.card = card;
    }

    getId() {
        return this.card.id;
    }

    getType() {
        return "CreditCard";
    }

}