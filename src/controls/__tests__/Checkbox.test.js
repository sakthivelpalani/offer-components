import React from "react";
import {mount} from "enzyme";
import sinon from "sinon";
import Checkbox from "../Checkbox.js";

describe("checkbox", function () {
    it("should change check state", function() {
        const value = "someValue";
        const stubbedOnChange = sinon.stub().withArgs(sinon.match.any, {checked: true, value});
        const wrapper = mount(React.createElement(Checkbox, {
            value,
            checked: false,
            onChange: stubbedOnChange
        }));
        wrapper.find("input[type=\"checkbox\"]").simulate("change");
        expect(stubbedOnChange.called).toBe(true);
    });
});