import CardCategoryFilter from "../CardCategoryFilter.js";
import OffersModel from "../../../model/OffersModel";

describe("Card category filter", function() {
    it("should get filter options given offers model", function() {
        const cardCategoryFilter = new CardCategoryFilter([]);
        const offerData = [
            {
                cpId: 1,
                cardCategoryList: ["REWARDS", "LIFESTYLE"]
            },
            {
                cpId: 2,
                cardCategoryList: ["REWARDS", "LIFESTYLE", "FUEL"]
            }
        ];
        const offersModel = new OffersModel(offerData, {});
        const filterOptions = cardCategoryFilter.getFilterOptions(offersModel);
        expect(filterOptions.map((filterOption) => filterOption.getValue())).toEqual(["REWARDS", "LIFESTYLE", "FUEL"]);
    });
});