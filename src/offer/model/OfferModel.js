import * as Domains from "../domain";
import {mappings} from "./DomainMappings.js";

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
            if (Domains[domainType] == undefined) {
              offer[domainType] = new mappings[key](value);      
            } else {
            offer[domainType] = new Domains[domainType](value);
            }
        });

        return offer;
    }
}