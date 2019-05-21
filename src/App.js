import React from "react";
import ReactDOM from "react-dom";
import OfferTable from "./offer/OfferTable";

export function launchOfferTable(offers, renderIntoElementWithId) {
    ReactDOM.render(
        <OfferTable />,
        document.getElementById(renderIntoElementWithId)
    );

}