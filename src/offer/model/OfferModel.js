import Bank from "../domain/Bank";
import CreditCard from "../domain/CreditCard";
import CreditCardAnnualFee from "../domain/CreditCardAnnualFee";
import Rewards from "../domain/Rewards";
import InterestRate from "../domain/InterestRate";
import ProcessingFee from "../domain/ProcessingFee";
import LoanAmount from "../domain/LoanAmount";
import Tenure from "../domain/Tenure";
import ReviewsSummary from "../domain/ReviewsSummary";

import * as Domains from "../domain";

import {omit} from "../../helpers/Utils";

export default class OfferModel {

    constructor(offerData) {
        this.offer = this.instantiateOffer(offerData);
    }

    get(type) {
        return this.offer[type];
    }

    getId() {
        return this.offer.id;
    }

    instantiateOffer(offerData) {
        const offer = {
            "id": offerData.id
        };

        Object.entries(omit(offerData, "id")).forEach(function([key, value]) {
            const domainType = key.charAt(0).toUpperCase() + key.slice(1);
            offer[domainType] = new Domains[domainType](value);
        });

        return offer;
    }
}