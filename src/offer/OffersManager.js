import OffersModel from "./model/OffersModel";
import personalizedOfferList from "../../public/cc-offers.json";
import offerFeaturesList from "../../public/cc-offer-features.json";
import {massage} from "./domain/builder/OffersDomainData.js";

export default class OffersManager {

    constructor(context) {
        const offersData = massage(JSON.stringify(personalizedOfferList), JSON.stringify(offerFeaturesList));
        this.offersModel = new OffersModel(offersData, context);
        this.context = context;
    }
}