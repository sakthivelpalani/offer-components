//@flow
import {uniqWith, filter, isEmpty, intersectionWith} from "lodash";
import FilterableDomain from "./FilterableDomain.js";
import OffersModel from "../../model/OffersModel.js";
import OfferModel from "../../model/OfferModel.js";
import CardCategoryList, {CardCategory} from "../CardCategoryList.js";

//TODO: type should be made static?
const cardCategoryListType =  new CardCategoryList([]).getType();

export default class CardCategoryFilter extends FilterableDomain<CardCategory, OffersModel> {
    
    getFilterOptions(offersModel: OffersModel): Array<CardCategory> {
        const filterOptions = offersModel.getOffersMap().reduce((aggr, offerModel) => {
            aggr.push(...getCardCategoryDomainsFromOffer(offerModel));
            return aggr;
        }, []);
        return uniqWith(filterOptions, comparator);
    }

    filter(offersModel: OffersModel): Promise<OffersModel> {
        if (isEmpty(this.filterCriteria)) {
            return Promise.resolve(offersModel);
        }
        const offers = offersModel.getOffersMap();
        const filteredValues =  filter(offers, (offer) => {
            const cardCategoryDomainsInOffer = getCardCategoryDomainsFromOffer(offer);
            const matching = intersectionWith(cardCategoryDomainsInOffer, this.filterCriteria, comparator);
            return !isEmpty(matching);
        });
        const offersModelFiltered = offersModel.copy(filteredValues);
        return Promise.resolve(offersModelFiltered);
    }
}

const getCardCategoryDomainsFromOffer = function(offerModel: OfferModel): Array<CardCategory> {
    const cardCategoryList = (offerModel.get(cardCategoryListType)).getDomains();
    return cardCategoryList;
};

const comparator = function(oneVal, othVal) {
    return oneVal.getValue() === othVal.getValue();
};