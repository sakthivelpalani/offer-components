import OffersModel from "./model/OffersModel";

export default class OffersManager {

    constructor(offersData, context) {
        this.offersModel = new OffersModel(offersData, context);
        this.context = context;
    }

}