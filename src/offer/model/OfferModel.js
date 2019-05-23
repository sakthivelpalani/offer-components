import Bank from "../domain/Bank";
import CreditCard from "../domain/CreditCard";
import CreditCardAnnualFee from "../domain/CreditCardAnnualFee";
import Rewards from "../domain/Rewards";
import InterestRate from "../domain/InterestRate";
import ProcessingFee from "../domain/ProcessingFee";
import LoanAmount from "../domain/LoanAmount";
import Tenure from "../domain/Tenure";
import ReviewsSummary from "../domain/ReviewsSummary";

export default class OfferModel {

    constructor(offerData) {
        const bankDomain = new Bank(offerData.bank);
        const creditCardDomain = new CreditCard(offerData.creditCard);
        const creditCardAnnualFeeDomain = new CreditCardAnnualFee(offerData.creditCardAnnualFee);
        const rewardsDomain = new Rewards(offerData.rewards);
        const reviewsSummaryDomain = new ReviewsSummary(offerData.reviewsSummary);
        const interestRateDomain =  new InterestRate(offerData.interestRate);
        const processingFeeDomain = new ProcessingFee(offerData.processingFee);
        const loanAmountDomain = new LoanAmount(offerData.loanAmount);
        const tenureDomain = new Tenure(offerData.tenure);

        this.offer = {
            "id": offerData.id,
            [bankDomain.getType()]: bankDomain,
            [creditCardDomain.getType()]: creditCardDomain,
            [creditCardAnnualFeeDomain.getType()]: creditCardAnnualFeeDomain,
            [rewardsDomain.getType()]: rewardsDomain,
            [reviewsSummaryDomain.getType()]: reviewsSummaryDomain,
            [interestRateDomain.getType()]: interestRateDomain,
            [processingFeeDomain.getType()]: processingFeeDomain,
            [loanAmountDomain.getType()]: loanAmountDomain,
            [tenureDomain.getType()]: tenureDomain
        };
    }

    get(type) {
        return this.offer[type];
    }

    getId() {
        return this.offer.id;
    }
}