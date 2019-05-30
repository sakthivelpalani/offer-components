import BankFilter from "../BankFilter.js";
import OffersModel from "../../../model/OffersModel";
import BankDomain from "../../../domain/Bank.js";

describe("Bank filter", function () {
    it("should get filter options", function () {
        const bankFilter = new BankFilter();
        const offerData = [
            {
                cpId: 1,
                bank: {
                    id:1,
                    name: "HDFC"
                }
            },
            {
                cpId: 2,
                bank: {
                    id:2,
                    name: "ICICI"
                }
            }
        ];
        const offersModel = new OffersModel(offerData, {});
        expect(bankFilter.getFilterOptions(offersModel).map((filterOption) => filterOption.getId())).toEqual([1,2]);
    });

    it("should filter given criteria",  () => {
        expect.assertions(1);
        const bankFilter = new BankFilter([
            new BankDomain({id:1}),
            new BankDomain({id:2})
        ]);
        const offerData = [
            {
                cpId: 10,
                bank: {
                    id:1,
                    name: "HDFC"
                }
            },
            {
                cpId: 20,
                bank: {
                    id:2,
                    name: "ICICI"
                }
            },
            {
                cpId: 30,
                bank: {
                    id:3,
                    name: "AXIS"
                }
            }
        ];
        const offersModel = new OffersModel(offerData, {});
        bankFilter.filter(offersModel)
            .then((filteredOffersModel) => 
                expect(filteredOffersModel.getOffersMap().map((offer) => 
                    offer.getId())).toEqual([10,20]));
    });

    it("should get empty offers if filter criteria not matching", () => {
        expect.assertions(1);
        const bankFilter = new BankFilter([
            new BankDomain({id:4})
        ]);
        const offerData = [
            {
                cpId: 10,
                bank: {
                    id:1,
                    name: "HDFC"
                }
            }
        ];
        const offersModel = new OffersModel(offerData, {});
        bankFilter.filter(offersModel)
            .then((filteredOffersModel) => 
                expect(filteredOffersModel.getOffersMap().length).toBe(0));
    });

    it("should get same offers model if no filter criteria present", () => {
        expect.assertions(1);
        const bankFilter = new BankFilter([
        ]);
        const offerData = [
            {
                cpId: 10,
                bank: {
                    id:1,
                    name: "HDFC"
                }
            }
        ];
        const offersModel = new OffersModel(offerData, {});
        bankFilter.filter(offersModel)
            .then((filteredOffersModel) => 
                expect(filteredOffersModel).toBe(offersModel));
    });
});