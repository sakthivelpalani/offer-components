import OfferModel from "./OfferModel";

export default class OffersModel {

    constructor(offersData) {
        const offersMap = offersData.map((offerData) => new OfferModel(offerData));

        return {
            offersMap: offersMap
        };
    }
}