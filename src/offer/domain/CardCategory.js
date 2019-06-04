//@flow
import {EnumDomain, EnumList} from "./Enum.js";
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

export class CardCategoryList extends EnumList<CardCategoryValueType> {

    initDomain(value: string) {
        return new CardCategory(value);
    }

    getTop(): Array<CardCategoryValueType> {
        return this.getValues().slice(0, 3);
    }
}


export class CardCategory extends EnumDomain<CardCategoryValueType> {
    getTypes(): any {
        return cardCategoryTypes;
    }
}