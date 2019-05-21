import React from "react";
import PropTypes from "prop-types";

import OffersManager from "../OffersManager";
import {ColumnRendererForDomain} from "./domainRenderers";

export default class OfferTableView extends React.PureComponent {

    static propTypes = {
        offersManager: PropTypes.instanceOf(OffersManager).isRequired,
        columns: PropTypes.array.isRequired,
        columnHeadings: PropTypes.array.isRequired
    }

    renderHeading() {
        return (
            <tr>
                {this.props.columnHeadings.map((columnHeading) => <th key={columnHeading}>{columnHeading}</th>)}
            </tr>
        );
    }

    renderColumn(renderer) {
        return (
            <td width="20%">{renderer}</td>
        );
    }

    renderOfferRow(offer) {
        const columnRenderers = [];
        this.props.columns.forEach((column) => {
            const domain = offer.get(column);
            const columnRenderer = ColumnRendererForDomain(domain);
            columnRenderers.push(this.renderColumn(columnRenderer));
        });

        return (
            <tr key={`row-${offer.getId()}`}>
                {columnRenderers}
            </tr>
        );
    }

    render() {
        const offerRows = [];
        this.props.offersManager.offersModel.offersMap.forEach((offer) => {
            offerRows.push(this.renderOfferRow(offer));
        });

        const style = {"marginTop":"30px"};
        return (
            <div>
                <table border = "1" style = {style}>
                    <thead>
                        {this.renderHeading()}
                    </thead>
                    <tbody>
                        {offerRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

