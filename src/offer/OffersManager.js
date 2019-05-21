import OffersModel from "./model/OffersModel";

export default class OffersManager {

    constructor(offersData) {
        this.offersModel = new OffersModel(offersData);
    }
}