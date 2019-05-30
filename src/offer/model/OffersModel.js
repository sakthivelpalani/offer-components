import OfferModel from "./OfferModel";

export default class OffersModel {

    constructor(offersData, context) {
        this.offersMap = offersData.map((offerData) => new OfferModel({offerData, context}));
        this.context = context;
    }

    getOffersMap() {
        return this.offersMap;
    }

    copy(offersMap) {
        const offersModel = new OffersModel([], this.context);
        offersModel.offersMap = offersMap;
        return offersModel;
    }

    getContext() {
        return this.context;
    }
}