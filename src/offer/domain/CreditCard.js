export default class CreditCard {

    constructor(card) {
        this.card = card;
    }

    getName() {
        return this.card.name;
    }

    getDisplayName() {
        return this.card.displayName;
    }

    getId() {
        return this.card.id;
    }

    getType() {
        return "CreditCard";
    }

}