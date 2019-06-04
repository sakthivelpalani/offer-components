import {CardCategoryList} from "../CardCategory.js";

describe("Card category list domain", function() {
    it("should set value as one of enums", function() {
        const cardCategoryDomain = new CardCategoryList(["REWARDS", "LIFESTYLE"]);
        expect(cardCategoryDomain.getValues()).toEqual(["REWARDS", "LIFESTYLE"]);
        expect(cardCategoryDomain.getTop()).toEqual(["REWARDS", "LIFESTYLE"]);
    });

    it("should not set value if value does not belong to enum", function() {
        const cardCategoryDomain = new CardCategoryList(["some type", "REWARDS"]);
        expect(cardCategoryDomain.getValues()).toEqual(["REWARDS"]);
        expect(cardCategoryDomain.getTop()).toEqual(["REWARDS"]);
    });

    it("should return top categories when asked for", function() {
        const cardCategoryDomain = new CardCategoryList(["LIFESTYLE", "REWARDS", "FUEL", "TRAVEL"]);
        expect(cardCategoryDomain.getTop()).toEqual(["LIFESTYLE", "REWARDS", "FUEL"]);
    });
});