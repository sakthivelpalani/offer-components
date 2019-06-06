import * as Domains from "../domain";

export default class OfferModel {

    constructor({offerData, context}) {
        this.offerData = offerData;
        this.context = context;
        this.offer = this._instantiateOffer();
    }

    _instantiateOffer() {
        return  {
            id: this.offerData.cpId,
            bank: new Domains.Bank(this.offerData.bank),
            cardName: new Domains.TextAndAdditionalInfo(this.offerData.cardName),
            cardUrl: new Domains.SimpleString(this.offerData.cardUrl),
            firstYearFee: new Domains.CreditCardAnnualFee(this.offerData.firstYearFee),
            usp: new Domains.Usp(this.offerData.usp),
            reviewsSummary: new Domains.ReviewsSummary(this.offerData.cardId, this.offerData.bank && this.offerData.bank.id),
            cardCategoryList: new Domains.CardCategoryList(this.offerData.cardCategoryList)
        };
    }

    getId() {
        return this.offer.id;
    }

    getBank() {
        return this.offer.bank;
    }

    getCardName() {
        return this.offer.cardName;
    }

    getCardUrl() {
        return this.offer.cardUrl;
    }

    getFirstYearFee() {
        return this.offer.firstYearFee;
    }

    getUsp() {
        return this.offer.usp;
    }

    getReviewsSummary() {
        return this.offer.reviewsSummary;
    }

    getCardCategoryList() {
        return this.offer.cardCategoryList;
    }
}