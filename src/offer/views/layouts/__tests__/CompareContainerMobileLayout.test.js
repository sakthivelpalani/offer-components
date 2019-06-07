import {shallow} from "enzyme";
import React from "react";
import PropTypes from "prop-types";

import CompareContainerMobileLayout from "../CompareContainerMobileLayout.js";
import OfferModel from "../../../model/OfferModel.js";
import CreditCardAnnualFee from "../../../domain/CreditCardAnnualFee.js";
import {createCCContext} from "../../../../helpers/__tests__/TestUtils.js";

class HeaderRendererStub extends React.Component {
    static propTypes = {
        domain: PropTypes.string.isRequired
    }
    render() {
        return <div>{this.props.domain}</div>;
    }
}

class ColRendererStub extends React.Component {
    static propTypes = {
        domain: PropTypes.instanceOf(CreditCardAnnualFee).isRequired
    }
    render() {
        return <div>{this.props.domain.getCurrentFees().getFees()}</div>;
    }
}

describe("Compare container layout", function() {
    const context = createCCContext();
    const offerData1 = {
        cpId: 1,
        firstYearFee: {
            fees: {
                value: 1000
            }
        }
    };
    const offerData2 = {
        cpId: 2,
        firstYearFee: {
            fees: {
                value: 2000
            }
        }
    };
    const selectedOffers = [new OfferModel({offerData: offerData1, context}),
        new OfferModel({offerData: offerData2, context})];
    const headerComponentConfig = {
        renderer: HeaderRendererStub,
        getDomain: function(offerModel) {
            return offerModel.getId();
        }
    };
    const colRendererConfig = {
        renderer: ColRendererStub,
        getDomain: function(offerModel) {
            return offerModel.getFirstYearFee();
        },
        title: "Col1"
    };

    const rowsConfig = [
        colRendererConfig
    ];

    it("should create a table with given renderer configs", function() {
        const compareContainer = React.createElement(CompareContainerMobileLayout, {
            selectedOffers, headerComponentConfig, rowsConfig
        });
        const wrapper = shallow(compareContainer);
        expect(wrapper.find("HeaderRendererStub").length).toBe(selectedOffers.length);
        expect(wrapper.find("ColRendererStub").length).toBe(selectedOffers.length);
        expect(wrapper.find("td").at(0).text()).toBe(colRendererConfig.title);
    });
});

