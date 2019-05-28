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
            "id": offerData.cpId
        };

        Object.entries(omit(offerData, "id")).forEach(function([key, value]) {
            const domainType = key.charAt(0).toUpperCase() + key.slice(1);
            if (Domains[domainType] == undefined) {
                if (mappings[key] != undefined) { //temporary, can be removed once all data is mapped to domains
                    offer[domainType] = new mappings[key](value);      
                }
            } else {
                offer[domainType] = new Domains[domainType](value);
            }
        });
        //Temporary till reviews ajax call is done
        offer["ReviewsSummary"] = new Domains["ReviewsSummary"]({
            "avgRating":  {
                "rating": 2.5,
                "scale": 5.0
            },
            "count" : 6897
        });

        return offer;
    }
}