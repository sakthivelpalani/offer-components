//@flow
import List from "./List.js";

const cardCategoryTypes = {
    LIFESTYLE: "LIFESTYLE",
    FUEL: "FUEL",
    TRAVEL: "TRAVEL",
    REWARDS: "REWARDS",
    PREMIUM: "PREMIUM",
    SHOPPING_AND_CASHBACK: "SHOPPING_AND_CASHBACK",
    LOW_FEE: "LOW_FEE"
};
export type CardCategoryValueType = $Keys<typeof cardCategoryTypes>;

export class CardCategoryList extends List<CardCategory, CardCategoryValueType> {

    initDomain(value: string) {
        return new CardCategory(value);
    }

    getItemValue(domain: ?CardCategory): ?CardCategoryValueType {
        if (domain == undefined) {
            return undefined;
        }
        return domain.getValue();
    }

    getTop(): Array<CardCategoryValueType> {
        return this.getValues().slice(0, 3);
    }
}


export class CardCategory {
    value: CardCategoryValueType
    constructor(value: string) {
        this.value = cardCategoryTypes[value];
    }

    getValue(): CardCategoryValueType {
        return this.value;
    }
}