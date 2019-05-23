import React from "react";
import PropTypes from "prop-types";

import OffersModel from "../../model/OffersModel";
import Context from "../../../helpers/Context.js";

import Style from "./OfferTableViewDesktopLayout.scss";

import {ColumnRendererForDomain} from "../domainRenderers";

export default class OfferTableViewDesktopLayout extends React.PureComponent {

    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        context: PropTypes.instanceOf(Context).isRequired,
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
        this.props.offersModel.getOffersMap().forEach((offer) => {
            offerRows.push(this.renderOfferRow(offer));
        });

        const style = Style.offerSection;
        return (
            <div>
                <table border = "1" style = {{style}}>
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