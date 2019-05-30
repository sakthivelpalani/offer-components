import {getDomainKlass} from "../domain";

import {omit} from "../../helpers/Utils";
import Logger from "../../helpers/Logger";


export default class OfferModel {

    constructor({offerData, context}) {
        this.offerData = offerData;
        this.context = context;
        this.offer = this._instantiateOffer();
    }

    get(type) {
        return this.offer[type];
    }

    getId() {
        return this.offer.id;
    }

    _instantiateOffer() {

        const offer = {
            "id": this.offerData.cpId
        };

        const constructDomain = (domainType, defaultValue) => {
            const domainKlass = getDomainKlass(domainType);
            if (!domainKlass) { //temporary check till all the domain classes are coded.
                Logger.error("Unable to find a domain for domainType: " + domainType);
            } else {
                const args = domainKlass.requiredValue ? this.offerData[domainKlass.requiredValue(this.context)] : defaultValue;
                const domain = new domainKlass(args);
                Object.assign(offer, {[domainType]: domain});
            }
        };

        Object.entries(omit(this.offerData, "cpId")).forEach(function([key, value]) {
            const capitalizeFirstLetter = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            };

            const domainType = capitalizeFirstLetter(key);
            constructDomain(domainType, value);
        });

        const additionalDomainTypesToBeConsidered = ["ReviewsSummary"]; //temp change. Will move out of this file.
        additionalDomainTypesToBeConsidered.map((domainType) => {
            constructDomain(domainType, {});
        });

        return offer;
    }
}