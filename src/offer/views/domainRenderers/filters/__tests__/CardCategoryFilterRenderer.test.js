import {shallow, mount} from "enzyme";
import React from "react";
import sinon from "sinon";
import CardCategoryFilterRenderer from "../CardCategoryFilterRenderer.js";
import {CardCategory as CardCategoryDomain} from "../../../../domain/CardCategoryList.js";

describe("Bank filter renderer", function () {
    it("should render filter options of bank", function() {
        const cardCategory1 = new CardCategoryDomain();
        const cardCategory2 = new CardCategoryDomain();
        sinon.stub(cardCategory1, "getValue").returns("REWARDS");
        sinon.stub(cardCategory2, "getValue").returns("PREMIUM");
        const stubbedOnChange = sinon.stub();
        const wrapper = shallow(React.createElement(CardCategoryFilterRenderer, {
            options: [cardCategory1, cardCategory2],
            onChange: stubbedOnChange
        }));
        const renderedCheckboxes = wrapper.find("Checkbox");
        expect(renderedCheckboxes.length).toBe(2);
        expect(renderedCheckboxes.at(0).prop("name")).toBe("REWARDS");
        expect(renderedCheckboxes.at(1).prop("name")).toBe("PREMIUM");
    });

    it("should update filterCriteria when checkbox change happens", function () {
        const cardCategory1 = new CardCategoryDomain();
        const cardCategory2 = new CardCategoryDomain();
        sinon.stub(cardCategory1, "getValue").returns("REWARDS");
        sinon.stub(cardCategory2, "getValue").returns("PREMIUM");
        const stubbedOnChange = sinon.stub();
        const wrapper = mount(React.createElement(CardCategoryFilterRenderer, {
            options: [cardCategory1, cardCategory2],
            onChange: stubbedOnChange
        }));
        wrapper.find("input[type=\"checkbox\"]").at(0).simulate("change", { target: { checked: true } });
        sinon.assert.calledWith(stubbedOnChange, sinon.match((CardCategoryDomain) => {
            return CardCategoryDomain!= undefined && CardCategoryDomain.length == 1 && CardCategoryDomain[0].getValue() == "REWARDS";
        }, "selectedCardCategoryDomain"));
        wrapper.find("input[type=\"checkbox\"]").at(0).simulate("change", { target: { checked: false } });
        sinon.assert.calledWith(stubbedOnChange, sinon.match((CardCategoryDomain) => {
            return CardCategoryDomain!= undefined && CardCategoryDomain.length == 0;
        }, "CardCategoryDomainNotChosen"));
    });
});