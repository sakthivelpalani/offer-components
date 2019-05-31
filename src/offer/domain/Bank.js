export default class Bank {

    constructor(bank) {
        this.bank = bank;
    }

    getName() {
        return this.bank.name;
    }

    getId() {
        return this.bank.id;
    }
}