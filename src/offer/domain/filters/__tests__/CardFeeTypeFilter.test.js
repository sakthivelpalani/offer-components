import CardFeeTypeFilter from "../CardFeeTypeFilter.js";
import {CardFeeType} from "../../CardFeeType.js";
import OfferModel from "../../../model/OfferModel.js";
import {createCCContext} from "../../../../helpers/__tests__/TestUtils.js";

describe("Card fee type filter", function() {
    it("should get domains from offer", function() {
        const offerData = {
            cpId: 1,
            cardFeeTypeList: ["PREMIUM", "LIFETIME_FREE"]
        };
        expect(new CardFeeTypeFilter().getDomainsFromOffer(new OfferModel({offerData, context: createCCContext()}))).
            toEqual([new CardFeeType("PREMIUM"), new CardFeeType("LIFETIME_FREE")]);
    });
});