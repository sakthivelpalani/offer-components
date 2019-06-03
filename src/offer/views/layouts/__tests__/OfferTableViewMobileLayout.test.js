import React from "react";
import {shallow} from "enzyme";
import sinon from "sinon";

import OffersTableViewMobileLayout from "../OfferTableViewMobileLayout.js";
import {createCCContext} from "../../../../helpers/__tests__/TestUtils.js";
import OffersModel from "../../../model/OffersModel.js";
import {default as getViewConfiguration} from "../../Config";

describe("Offer table view mobile layout", function() {
    const offerData = [
        {
            cpId: 1,
            cardCategoryList: ["REWARDS", "LIFESTYLE"],
            bank: {
                id: 1,
                name: "HDFC"
            }
        },
        {
            cpId: 2,
            cardCategoryList: ["REWARDS", "LIFESTYLE", "FUEL"],
            bank: {
                id: 1,
                name: "ICICI"
            }
        }
    ];
    const context = createCCContext();
    const offersModel = new OffersModel(offerData, context);
    const viewConfiguration = getViewConfiguration(context.getProductType());
    let setStateSpy;
    beforeEach(() => {
        setStateSpy = sinon.spy(OffersTableViewMobileLayout.prototype, "setState");        

    });

    afterEach(() => {
        setStateSpy.restore();

    });
    it("should have filters container", function() { 
        const wrapper = shallow(React.createElement(OffersTableViewMobileLayout, {
            offersModel,
            context,
            viewConfiguration
        }));
        const filterContainer = wrapper.find("FilterContainerMobileLayout");
        expect(filterContainer.length).toBe(1);
        expect(filterContainer.prop("offersModel")).toBe(offersModel);
    });

    it("should update state with filtered offersModel", function() {
        const wrapper = shallow(React.createElement(OffersTableViewMobileLayout, {
            offersModel,
            context,
            viewConfiguration
        }));
        const filterContainer = wrapper.find("FilterContainerMobileLayout");
        const filteredOffersModel = new OffersModel(offerData, context);
        filterContainer.prop("onFilter")(filteredOffersModel);
        expect(setStateSpy.called).toBe(true);
        expect(setStateSpy.args[0][0]).toEqual({filteredOffersModel});
    });
});