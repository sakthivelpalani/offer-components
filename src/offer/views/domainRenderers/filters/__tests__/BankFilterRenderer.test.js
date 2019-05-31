import {shallow, mount} from "enzyme";
import React from "react";
import sinon from "sinon";
import BankFilterRenderer from "../BankFilterRenderer.js";
import BankDomain from "../../../../domain/Bank.js";

describe("Bank filter renderer", function () {
    it("should render filter options of bank", function() {
        const bank1 = new BankDomain();
        const bank2 = new BankDomain();
        sinon.stub(bank1, "getName").returns("HDFC");
        sinon.stub(bank1, "getId").returns("1");
        sinon.stub(bank2, "getName").returns("ICICI");
        sinon.stub(bank2, "getId").returns("2");
        const stubbedOnChange = sinon.stub();
        const wrapper = shallow(React.createElement(BankFilterRenderer, {
            options: [bank1, bank2],
            onChange: stubbedOnChange
        }));
        const renderedCheckboxes = wrapper.find("Checkbox");
        expect(renderedCheckboxes.length).toBe(2);
        expect(renderedCheckboxes.at(0).prop("name")).toBe("HDFC");
        expect(renderedCheckboxes.at(1).prop("name")).toBe("ICICI");
    });

    it("should update filterCriteria when checkbox change happens", function () {
        const bank1 = new BankDomain();
        const bank2 = new BankDomain();
        sinon.stub(bank1, "getName").returns("HDFC");
        sinon.stub(bank1, "getId").returns("1");
        sinon.stub(bank2, "getName").returns("ICICI");
        sinon.stub(bank2, "getId").returns("2");
        const stubbedOnChange = sinon.stub();
        const wrapper = mount(React.createElement(BankFilterRenderer, {
            options: [bank1, bank2],
            onChange: stubbedOnChange
        }));
        wrapper.find("input[type=\"checkbox\"]").at(0).simulate("change", { target: { checked: true } });
        sinon.assert.calledWith(stubbedOnChange, sinon.match((bankDomain) => {
            return bankDomain!= undefined && bankDomain.length == 1 && bankDomain[0].getId() == 1;
        }, "selectedBankDomain"));
        wrapper.find("input[type=\"checkbox\"]").at(0).simulate("change", { target: { checked: false } });
        sinon.assert.calledWith(stubbedOnChange, sinon.match((bankDomain) => {
            return bankDomain!= undefined && bankDomain.length == 0;
        }, "bankDomainNotChosen"));
    });
});