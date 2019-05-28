import {find} from "lodash";
import personalizedOfferList from "../../../../../public/cc-offers.json";
import offerFeaturesList from "../../../../../public/cc-offer-features.json";
import {massage} from "../OffersDomainData.js";

describe("should massage offers data", function() {
    it("should override second year fee from offer features if present in personalized offer", function() {
        const offerId = 4057402;
        const personalizedOffer = findByCpId(personalizedOfferList, offerId);
        const offersDomainData = massage(JSON.stringify(personalizedOfferList), JSON.stringify(offerFeaturesList));
        expect(offersDomainData).toBeDefined();
        const offerDomainData = findByCpId(offersDomainData, offerId);
        expect(offerDomainData.secondYearFee.fees.value)
            .toBe(personalizedOffer.secondYearFeeOnwards.value);
    });

    it("should override first year fee from offer features if present in personalized offer", function() {
        const offerId = 4057402;
        const personalizedOffer = findByCpId(personalizedOfferList, offerId);
        const offersDomainData = massage(JSON.stringify(personalizedOfferList), JSON.stringify(offerFeaturesList));
        expect(offersDomainData).toBeDefined();
        const offerDomainData = findByCpId(offersDomainData, offerId);
        expect(offerDomainData.firstYearFee.fees.value)
            .toBe(personalizedOffer.oldFirstYearFee.value);
    });

    it("should substitute product notice in pros", function() {
        const offerId = 403955;
        const personalizedOffer = findByCpId(personalizedOfferList, offerId);
        const offersDomainData = massage(JSON.stringify(personalizedOfferList), JSON.stringify(offerFeaturesList));
        expect(offersDomainData).toBeDefined();
        const offerDomainData = findByCpId(offersDomainData, offerId);
        expect(offerDomainData.pros[offerDomainData.pros.length-1].text)
            .toBe(personalizedOffer.productNotice.replace(/\$\{RUPEE\}/g, "Rs."));

    });

    it("should show pros list basis stp only or not and pre-approved or not", function() {
        const offerId = 420002;
        const personalizedOffer = findByCpId(personalizedOfferList, offerId);
        const offersDomainData = massage(JSON.stringify(personalizedOfferList), JSON.stringify(offerFeaturesList));
        expect(offersDomainData).toBeDefined();
        expect(personalizedOffer.isSTPOnly).toBe(true);
        expect(personalizedOffer.isPreApproved).toBe(true);
        const offerDomainData = findByCpId(offersDomainData, offerId);
        expect(offerDomainData.pros[0].text)
            .toBe("Instant approval and Express processing");
        expect(offerDomainData.pros[1].text)
            .toBe("This offer is available only if all necessary documents are uploaded online");
    });

    it("should show documents list basis pre-approved or not", function() {
        const offerId = 420002;
        const personalizedOffer = findByCpId(personalizedOfferList, offerId);
        const offersDomainData = massage(JSON.stringify(personalizedOfferList), JSON.stringify(offerFeaturesList));
        expect(offersDomainData).toBeDefined();
        expect(personalizedOffer.isPreApproved).toBe(true);
        const offerDomainData = findByCpId(offersDomainData, offerId);
        expect(offerDomainData.documents[0].text)
            .toBe("One photograph");
        expect(offerDomainData.documents[1].text)
            .toBe("No income, ID & address proof documents required");
    });

    it("should replace rupee symbol", function() {
        const offerId = 420002;
        const offersDomainData = massage(JSON.stringify(personalizedOfferList), JSON.stringify(offerFeaturesList));
        expect(offersDomainData).toBeDefined();
        const offerDomainData = findByCpId(offersDomainData, offerId);
        expect(offerDomainData.joiningPerks[0].text)
            .toBe("e-Vouchers worth Rs. 15k");
    });

    const findByCpId =  function(offerList, offerId) {
        return find(offerList, (offer) => {
            if (offer.cpId == offerId) {
                return true;
            }
            return false;
        });
    };
});