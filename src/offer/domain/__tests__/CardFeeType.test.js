import {CardFeeTypeList} from "../CardFeeType.js";

describe("Card fee type list domain", function() {
    it("should set value as one of enums", function() {
        const cardNetworkDomain = new CardFeeTypeList(["PREMIUM", "FEE_WAIVER"]);
        expect(cardNetworkDomain.getValues()).toEqual(["PREMIUM", "FEE_WAIVER"]);
    });

    it("should not set value if value does not belong to enum", function() {
        const cardNetworkDomain = new CardFeeTypeList(["some type", "PREMIUM"]);
        expect(cardNetworkDomain.getValues()).toEqual(["PREMIUM"]);
    });
});