import sinon from "sinon";
import CardCategoryFilterRenderer from "../CardCategoryFilterRenderer.js";
import {CardCategory as CardCategoryDomain} from "../../../../domain/CardCategoryList.js";

describe("Card category filter renderer", function () {
    it("should get value from domain", function() {
        const cardCategory1 = new CardCategoryDomain();
        sinon.stub(cardCategory1, "getValue").returns("REWARDS");
        expect(new CardCategoryFilterRenderer().getValue(cardCategory1)).toBe("REWARDS");
        expect(new CardCategoryFilterRenderer().getLabel(cardCategory1)).toBe("REWARDS");
    });
});