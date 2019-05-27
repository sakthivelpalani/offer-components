import React from "react";
import PropTypes from "prop-types";

import OffersManager from "../OffersManager";
import {DeviceType} from "../../helpers/Constants.js";

import {default as DesktopLayout} from "./layouts/OfferTableViewDesktopLayout";
import {default as MobileLayout} from "./layouts/OfferTableViewMobileLayout";

import {default as getViewConfiguration} from "./config";

export default class OfferTableView extends React.PureComponent {

    static propTypes = {
        offersManager: PropTypes.instanceOf(OffersManager).isRequired,
        columns: PropTypes.array.isRequired,
        columnHeadings: PropTypes.array.isRequired
    }

    render() {
        const viewConfiguration = getViewConfiguration(this.props.offersManager.context.getProductType());

        const preferMobileLayout = DeviceType.MOBILE.is(this.props.offersManager.context.getDeviceType());
        const LayoutKlass = preferMobileLayout ? MobileLayout :  DesktopLayout;
        return (<LayoutKlass
            offersModel = {this.props.offersManager.offersModel}
            context = {this.props.offersManager.context}
            viewConfiguration = {viewConfiguration}

            columns = {this.props.columns}
            columnHeadings = {this.props.columnHeadings}
        />);
    }
}

