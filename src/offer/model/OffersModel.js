import OfferModel from "./OfferModel";

export default class OffersModel {

    constructor(offersData, context) {
        this.offersMap = offersData.map((offerData) => new OfferModel(offerData));
        this.context = context;
    }

    getOffersMap() {
        return this.offersMap;
    }

    getContext() {
        return this.context;
    }
}