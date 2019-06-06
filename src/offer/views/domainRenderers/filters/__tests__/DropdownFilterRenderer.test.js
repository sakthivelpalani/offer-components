import {mount} from "enzyme";
import React from "react";
import sinon from "sinon";
import DropdownFilterRenderer from "../DropdownFilterRenderer.js";

class DropdownFilterRendererStub extends DropdownFilterRenderer {
    getValue(domain) {
        return domain;
    }

    getLabel(domain) {
        return domain;
    }
}

describe("Dropdown filter renderer", function () {
    it("should render filter options of any domain", function() {
        const stubbedOnChange = sinon.stub();
        const domain1 = "VALUE1";
        const domain2 = "VALUE2";
        const wrapper = mount(React.createElement(DropdownFilterRendererStub, {
            options: [domain1, domain2],
            selectedOptions: [domain2],
            onChange: stubbedOnChange
        }));
        expect(wrapper.find("Select").prop("options")).toEqual([{value: domain1, label: domain1}, {value: domain2, label: domain2}]);
        expect(wrapper.find("Select").prop("value")).toEqual([{value: domain2, label: domain2}]);
    });

    it("should update filterCriteria when checkbox change happens", function () {
        const stubbedOnChange = sinon.stub();
        const domain1 = "VALUE1";
        const domain2 = "VALUE2";
        const wrapper = mount(React.createElement(DropdownFilterRendererStub, {
            options: [domain1, domain2],
            onChange: stubbedOnChange
        }));
        wrapper.find("Select").prop("onChange")([{value: domain1, label: domain1}]);
        sinon.assert.calledWith(stubbedOnChange, sinon.match((domains) => {
            return domains!= undefined && domains.length == 1 && domains[0] == domain1;
        }, "selectedDomain"));
        wrapper.find("Select").prop("onChange")([]);
        sinon.assert.calledWith(stubbedOnChange, sinon.match((domains) => {
            return domains!= undefined && domains.length == 0;
        }, "noDomainChosen"));
    });
});