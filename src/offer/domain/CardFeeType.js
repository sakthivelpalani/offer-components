//@flow
import {EnumDomain, EnumList} from "./Enum.js";

const cardFeeTypes = {
    LIFETIME_FREE: "LIFETIME_FREE",
    PREMIUM: "PREMIUM",
    ZERO_FIRST_YEAR_FEE: "ZERO_FIRST_YEAR_FEE",
    FEE_WAIVER: "FEE_WAIVER"
};
export type CardFeeValueType = $Keys<typeof cardFeeTypes>;

export class CardFeeTypeList extends EnumList<CardFeeValueType> {

    initDomain(value: string) {
        return new CardFeeType(value);
    }
}


export class CardFeeType extends EnumDomain<CardFeeValueType> {
    getTypes(): any {
        return cardFeeTypes;
    }
}