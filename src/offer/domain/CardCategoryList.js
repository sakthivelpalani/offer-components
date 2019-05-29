//@flow
import {compact, filter} from "lodash";

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

export default class CardCategoryList {
    domains: Array<CardCategory>

    constructor(values: Array<string>) {
        if(values == undefined) {
            this.domains = [];
        } else {
            this.domains = values.map((value) => {
               return new CardCategory(value);
            });
        }
    }
    getType(): string {
        return "CardCategoryList";
    }

    getValues(): Array<CardCategoryValueType> {
        return compact(this.domains.map((cardCategoryDomain)=> {
            return cardCategoryDomain.getValue();
        }));
    }

    getDomains(): Array<CardCategory> {
        return filter(this.domains, (domain)=> domain.getValue() != undefined);
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