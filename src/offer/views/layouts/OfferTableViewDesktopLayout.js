import React from "react";
import PropTypes from "prop-types";

import OffersModel from "../../model/OffersModel";
import Context from "../../../helpers/Context.js";

export default class OfferTableViewDesktopLayout extends React.PureComponent {

    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        context: PropTypes.instanceOf(Context).isRequired,
        viewConfiguration: PropTypes.object.isRequired
    }

    render() {
        return <div>Hello world!</div>;
    }
} 