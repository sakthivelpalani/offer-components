import CardCategory from "../CardCategory.js";

describe("Card category domain", function() {
    it("should set value as one of enums", function() {
        const cardCategoryDomain = new CardCategory(["REWARDS", "LIFESTYLE"]);
        expect(cardCategoryDomain.getValue()).toEqual(["REWARDS", "LIFESTYLE"]);
        expect(cardCategoryDomain.getTop()).toEqual(["REWARDS", "LIFESTYLE"]);
    });

    it("should not set value if value does not belong to enum", function() {
        const cardCategoryDomain = new CardCategory(["some type", "REWARDS"]);
        expect(cardCategoryDomain.getValue()).toEqual(["REWARDS"]);
        expect(cardCategoryDomain.getTop()).toEqual(["REWARDS"]);
    });

    it("should return top categories when asked for", function() {
        const cardCategoryDomain = new CardCategory(["LIFESTYLE", "REWARDS", "FUEL", "TRAVEL"]);
        expect(cardCategoryDomain.getTop()).toEqual(["LIFESTYLE", "REWARDS", "FUEL"]);
    })
});