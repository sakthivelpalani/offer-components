import {shallow} from "enzyme";
import React from "react";

import YesNoRenderer from "../YesNoRenderer.js";

describe("Yes no renderer", function() {
    it("should show yes or no", function() {
        expect(shallow(React.createElement(YesNoRenderer, {domain: true})).find("div[children=\"Yes\"]").length).toBe(1);
        expect(shallow(React.createElement(YesNoRenderer, {domain: false})).find("div[children=\"No\"]").length).toBe(1);
    });
});