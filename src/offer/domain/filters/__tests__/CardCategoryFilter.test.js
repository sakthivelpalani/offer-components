import CardCategoryFilter from "../CardCategoryFilter.js";
import {CardCategory} from "../../../domain/CardCategory.js";
import OffersModel from "../../../model/OffersModel";
import Context from "../../../../helpers/Context";

const createContext = (productType, deviceType = "DESKTOP") => {
    const data = {
        deviceType: deviceType,
        productType: productType
    };
    return new Context(data);
};

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
        const context = createContext("CC");
        const offersModel = new OffersModel(offerData, context);
        const filterOptions = cardCategoryFilter.getFilterOptions(offersModel);
        expect(filterOptions.map((filterOption) => filterOption.getValue())).toEqual(["REWARDS", "LIFESTYLE", "FUEL"]);
    });

    it("should get filtered data on criteria", () => {
        expect.assertions(3);
        const cardCategoryFilter = new CardCategoryFilter([
            new CardCategory("REWARDS"), new CardCategory("FUEL")
        ]);
        const offerData = [
            {
                cpId: 1,
                cardCategoryList: ["REWARDS", "LIFESTYLE"]
            },
            {
                cpId: 2,
                cardCategoryList: ["REWARDS", "LIFESTYLE", "FUEL"]
            },
            {
                cpId: 3,
                cardCategoryList: ["PREMIUM"]
            }
        ];
        const context = createContext("CC");
        const offersModel = new OffersModel(offerData, context);
        return cardCategoryFilter.filter(offersModel).
            then((offersModel) => {
                expect(offersModel.getOffersMap()[0].getId()).toBe(1);
                expect(offersModel.getOffersMap()[1].getId()).toBe(2);
                return expect(offersModel.getOffersMap().length).toBe(2);
            });
    });

    it("should get empty offers if filter criteria not matching", () => {
        expect.assertions(1);
        const cardCategoryFilter = new CardCategoryFilter([
            new CardCategory("FUEL")
        ]);
        const offerData = [
            {
                cpId: 1,
                cardCategoryList: ["REWARDS"]
            }
        ];
        const context = createContext("CC");
        const offersModel = new OffersModel(offerData, context);
        return cardCategoryFilter.filter(offersModel).
            then((offersModel) => {
                return expect(offersModel.getOffersMap().length).toBe(0);
            });
    });

    it("should get same offers model if no filter criteria present", () => {
        expect.assertions(1);
        const cardCategoryFilter = new CardCategoryFilter([]);
        const offerData = [
            {
                cpId: 1,
                cardCategoryList: ["REWARDS"]
            }
        ];
        const context = createContext("CC");
        const offersModel = new OffersModel(offerData, context);
        return cardCategoryFilter.filter(offersModel).
            then((filteredOffersModel) => {
                return expect(filteredOffersModel).toBe(offersModel);
            });
    });
});