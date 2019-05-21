import React from "react";
import PropTypes from "prop-types";

import OffersManager from "../OffersManager";
import {DeviceType} from "../../helpers/Constants.js";

import {default as DesktopLayout} from "./layouts/OfferTableViewDesktopLayout";
import {default as MobileLayout} from "./layouts/OfferTableViewMobileLayout";

export default class OfferTableView extends React.PureComponent {

    static propTypes = {
        offersManager: PropTypes.instanceOf(OffersManager).isRequired,
        columns: PropTypes.array.isRequired,
        columnHeadings: PropTypes.array.isRequired
    }

    render() {
        const preferMobileLayout = DeviceType.MOBILE.is(this.props.offersManager.context.getDeviceType());
        const LayoutKlass = preferMobileLayout ? MobileLayout :  DesktopLayout;
        return (<LayoutKlass
            offersModel = {this.props.offersManager.offersModel}
            columns = {this.props.columns}
            columnHeadings = {this.props.columnHeadings}
            context = {this.props.offersManager.context}
        />);
    }
}

