import {compact} from "lodash";

const cardCategoryTypes = {
    LIFESTYLE: "LIFESTYLE",
    FUEL: "FUEL",
    TRAVEL: "TRAVEL",
    REWARDS: "REWARDS",
    PREMIUM: "PREMIUM",
    SHOPPING_AND_CASHBACK: "SHOPPING_AND_CASHBACK",
    LOW_FEE: "LOW_FEE"
};

export default class CardCategory {
    constructor(values) {
        if(values == undefined) {
            this.values = [];
        } else {
            this.values = compact(values.map((value) => {
                if(cardCategoryTypes[value] != undefined) {
                    return cardCategoryTypes[value];
                }
                return undefined;
            }));
        }
    }
    getType() {
        return "CardCategory";
    }

    getValue() {
        return this.values;
    }

    getTop() {
        return this.values.slice(0, 3);
    }
}