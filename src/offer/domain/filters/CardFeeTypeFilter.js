//@flow
import OfferModel from "../../model/OfferModel.js";
import {CardFeeType} from "../CardFeeType.js";
import EnumFilter from "./EnumFilter.js";

export default class CardFeeTypeFilter extends EnumFilter<CardFeeType> {
    getDomainsFromOffer(offerModel: OfferModel): Array<CardFeeType> {
        const cardCategoryList = (offerModel.getCardFeeTypeList()).getDomains();
        return cardCategoryList;
    }
}