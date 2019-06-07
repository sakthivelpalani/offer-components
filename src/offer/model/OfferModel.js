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
            secondYearOnwards: new Domains.CreditCardAnnualFee(this.offerData.secondYearOnwardsAnnualFee),
            reducedFee: new Domains.CreditCardAnnualFee(this.offerData.reducedFee),
            usp: new Domains.Usp(this.offerData.usp),
            reviewsSummary: new Domains.ReviewsSummary(this.offerData.cardId, this.offerData.bank && this.offerData.bank.id),
            cardCategoryList: new Domains.CardCategoryList(this.offerData.cardCategoryList),
            cardNetworkList: new Domains.CardNetworkList(this.offerData.cardNetworkList),
            cardFeeTypeList: new Domains.CardFeeTypeList(this.offerData.cardFeeTypeList)
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

    getSecondYearOnwards() {
        return this.offer.secondYearOnwards;
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

    getCardNetworkList() {
        return this.offer.cardNetworkList;
    }

    getCardFeeTypeList() {
        return this.offer.cardFeeTypeList;
    }

    getReducedFee() {
        return this.offer.reducedFee;
    }
}