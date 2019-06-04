//@flow
import OfferModel from "../../model/OfferModel.js";
import {CardCategory} from "../CardCategory.js";
import EnumFilter from "./EnumFilter.js";

export default class CardCategoryFilter extends EnumFilter<CardCategory> {
    getDomainsFromOffer(offerModel: OfferModel): Array<CardCategory> {
        const cardCategoryList = (offerModel.getCardCategoryList()).getDomains();
        return cardCategoryList;
    }
}