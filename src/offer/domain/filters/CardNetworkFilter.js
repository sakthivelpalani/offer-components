//@flow
import OfferModel from "../../model/OfferModel.js";
import {CardNetwork} from "../CardNetwork.js";
import EnumFilter from "./EnumFilter.js";

export default class CardNetworkFilter extends EnumFilter<CardNetwork> {
    getDomainsFromOffer(offerModel: OfferModel): Array<CardNetwork> {
        const cardCategoryList = (offerModel.getCardNetworkList()).getDomains();
        return cardCategoryList;
    }
}