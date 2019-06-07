import React from "react";
import PropTypes from "prop-types";

import OfferModel from "../../model/OfferModel.js";
import {reactElementForRendererViewConfig} from "../domainRenderers/index.js";

const rendererConfigType = PropTypes.shape({
    renderer: PropTypes.instanceOf(React.Component).isRequired,
    title: PropTypes.string.isRequired,
    getDomain: PropTypes.func
});
export default class CompareContainerMobileLayout extends React.PureComponent {
    static propTypes = {
        selectedOffers: PropTypes.arrayOf(PropTypes.instanceOf(OfferModel)).isRequired,
        headerComponentConfig: PropTypes.instanceOf(rendererConfigType).isRequired,
        rowsConfig: PropTypes.arrayOf(PropTypes.instanceOf(rendererConfigType)).isRequired
    }

    render() {
        const tableHeaders = this.props.selectedOffers.map((selectedOffer, index) => {
            const headerRenderer = reactElementForRendererViewConfig(
                this.props.headerComponentConfig, selectedOffer);
            return <th key={index}>{headerRenderer}</th>;
        });        
        const tableRows = this.props.rowsConfig.map((rowConfig, rowNumber) => {
            const row = this.props.selectedOffers.map((selectedOffer, index) => {
                const colRenderer = reactElementForRendererViewConfig(
                    rowConfig, selectedOffer);
                return <td key={index}>{colRenderer}</td>;
            });
            return (<tr key={rowNumber}>
                <td>{rowConfig.title}</td>
                {row}
            </tr>);
        });
        return <table>
            <thead>
                <tr>
                    <th>Compare</th>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>;
    }
}