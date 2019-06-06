import {shallow} from "enzyme";
import React from "react";
import sinon from "sinon";

import FilterContainer from "../FilterContainerMobileLayout.js";
import OffersModel from "../../../model/OffersModel.js";
import {createCCContext} from "../../../../helpers/__tests__/TestUtils.js";
import Bank from "../../../domain/Bank.js";
import CardCategoryFilter from "../../../domain/filters/CardCategoryFilter.js";
import BankFilter from "../../../domain/filters/BankFilter.js";
import CardFeeTypeFilter from "../../../domain/filters/CardFeeTypeFilter.js";
import CardNetworkFilter from "../../../domain/filters/CardNetworkFilter.js";
import FilterChain from "../../../domain/filters/FilterChain.js";

//TODO: this test is not really a unit test, it is having integration with the filter renderers and filter domains
//need to clean this up with better mocking
describe("Filter container mobile", function () {
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
    const offersModel = new OffersModel(offerData, createCCContext());
    const selectedFilterCriteria = new Bank({name: "HDFC", id: 1});
    const filterableDomainsInState = {filterableDomains: [new BankFilter([selectedFilterCriteria]), new CardCategoryFilter([]), new CardFeeTypeFilter([]), new CardNetworkFilter([])]};

    let setStateSpy;
    beforeEach(() => {
        setStateSpy = sinon.spy(FilterContainer.prototype, "setState");        

    });

    afterEach(() => {
        setStateSpy.restore();

    });

    it("should render all the filter renderers", function() {             
        const wrapper = shallow(React.createElement(FilterContainer, {
            offersModel,
            onFilter: sinon.stub()
        }));
        expect(wrapper.find("BankFilterRenderer").length).toBeDefined();
        expect(wrapper.find("CardCategoryFilterRenderer").length).toBeDefined();
        expect(wrapper.find("CardFeeTypeFilterRenderer").length).toBeDefined();
        expect(wrapper.find("CardNetworkFilterRenderer").length).toBeDefined();
    });

    it("should update state with selected values when sub components are changed", function() {
        const wrapper = shallow(React.createElement(FilterContainer, {
            offersModel,
            onFilter: sinon.stub()
        }));
        const cardCategoryFilterRenderer = wrapper.find("BankFilterRenderer");
        expect(cardCategoryFilterRenderer).toBeDefined();
        cardCategoryFilterRenderer.prop("onChange")([selectedFilterCriteria]);
        
        expect(setStateSpy.args[0][0]).toEqual(filterableDomainsInState);
    });

    it("should call filter chain with filterable domains when filter is clicked",  () => {
        const filterChainStub = sinon.stub(FilterChain.prototype, "doFilter").callsFake((filteredOffersModel) => Promise.resolve(filteredOffersModel));
        const wrapper = shallow(React.createElement(FilterContainer, {
            offersModel,
            onFilter: sinon.stub()
        }));
        wrapper.setState(filterableDomainsInState);
        wrapper.find("a[name=\"Filter\"]").simulate("click");
        expect(filterChainStub.called).toBe(true);
        FilterChain.prototype.doFilter.restore();
    });

    it("should call filter chain with cleared filterable domains when reset is clicked",  () => {
        const filterChainStub = sinon.stub(FilterChain.prototype, "doFilter").callsFake((filteredOffersModel) => Promise.resolve(filteredOffersModel));
        const wrapper = shallow(React.createElement(FilterContainer, {
            offersModel,
            onFilter: sinon.stub()
        }));
        wrapper.find("a[name=\"Reset\"]").simulate("click");
        wrapper.setState(filterableDomainsInState);
        expect(filterChainStub.called).toBe(true);
        expect(setStateSpy.args[0][0]).toEqual({filterableDomains: [new BankFilter([]), new CardCategoryFilter([]), new CardFeeTypeFilter([]), new CardNetworkFilter([])]});
        FilterChain.prototype.doFilter.restore();
    });
});