import React from "react";
import ReactDOM from "react-dom";

import OfferTableView from "./offer/views/OfferTableView";
import OffersManager from "./offer/OffersManager";

import Context from "./helpers/Context";

export function createContext(data) {
    return new Context(data);
}

export function createOffersManager(context) {
    return new OffersManager(context);
}

export function launchOfferTable(offersManager, renderIntoElementWithId) {
    ReactDOM.render(
        <OfferTableView offersManager = {offersManager}/>,
        document.getElementById(renderIntoElementWithId)
    );
}