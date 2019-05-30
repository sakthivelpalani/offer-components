//@flow

import {uniqWith, filter, isEmpty, intersectionWith} from "lodash";

import FilterableDomain from "./FilterableDomain.js";
import OffersModel from "../../model/OffersModel.js";
import BankDomain from "../Bank.js";
import OfferModel from "../../model/OfferModel.js";

//TODO: type should be made static?
const bankType =  new BankDomain({}).getType()

export default class BankFilter extends FilterableDomain<BankDomain, OffersModel> {
    getFilterOptions(offersModel: OffersModel): Array<BankDomain> {
        const filterOptions = offersModel.getOffersMap().reduce((aggr, offerModel) => {
            aggr.push(getBankDomainFromOffer(offerModel));
            return aggr;
        }, []);
        return uniqWith(filterOptions, comparator);
    }

    filter(offersModel: OffersModel): Promise<OffersModel> {
        if(isEmpty(this.filterCriteria)) {
            return Promise.resolve(offersModel);
        }
        const offers = offersModel.getOffersMap();
        const filteredValues =  filter(offers, (offer) => {
            const bankDomainFromOffer = getBankDomainFromOffer(offer);
            const matching = filter(this.filterCriteria, (filterCriterion) => filterCriterion.getId() === bankDomainFromOffer.getId());
            return !isEmpty(matching);
        });
        const offersModelFiltered = offersModel.copy(filteredValues);
        return Promise.resolve(offersModelFiltered);
    }
}

const getBankDomainFromOffer = function(offerModel: OfferModel): BankDomain {
    const bank = (offerModel.get(bankType));
    return bank;
};

const comparator = function(oneVal, othVal) {
    return oneVal.getId() === othVal.getId();
};