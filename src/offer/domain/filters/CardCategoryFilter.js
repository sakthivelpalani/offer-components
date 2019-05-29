//@flow
import {uniqWith} from "lodash";
import FilterableDomain from "./FilterableDomain.js";
import OffersModel from "../../model/OffersModel.js";
import CardCategoryList, {CardCategory} from "../CardCategoryList.js";

export default class CardCategoryFilter extends FilterableDomain<CardCategory, OffersModel> {
    getFilterOptions(filterableData: OffersModel): Array<CardCategory> {
        const cardCategoryListType =  new CardCategoryList().getType()
        const filterOptions = filterableData.getOffersMap().reduce((aggr, offerModel) => {
            const cardCategoryList = (offerModel.get(cardCategoryListType));
            aggr.push(...cardCategoryList.getDomains())
            return aggr;
        }, []);
        return uniqWith(filterOptions, function(arrVal, othVal) {
            return arrVal.getValue() === othVal.getValue();
          });
    }
}