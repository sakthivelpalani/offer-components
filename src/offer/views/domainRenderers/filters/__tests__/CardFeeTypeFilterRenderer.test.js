import sinon from "sinon";
import CardFeeTypeFilterRenderer from "../CardFeeTypeFilterRenderer.js";
import {CardFeeType as CardFeeTypeDomain} from "../../../../domain/CardFeeType.js";

describe("Card fee type filter renderer", function () {
    it("should get value from domain", function() {
        const cardFeeType = new CardFeeTypeDomain();
        sinon.stub(cardFeeType, "getValue").returns("PREMIUM");
        expect(new CardFeeTypeFilterRenderer().getValue(cardFeeType)).toBe("PREMIUM");
        expect(new CardFeeTypeFilterRenderer().getLabel(cardFeeType)).toBe("PREMIUM");
    });
});