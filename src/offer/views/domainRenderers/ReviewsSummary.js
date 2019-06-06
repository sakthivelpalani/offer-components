import React from "react";
import PropTypes from "prop-types";

import {default as OfferModel} from "../../model/OfferModel";
import Style from "./../layouts/OfferTableViewMobileLayout.scss";

export class RatingItemRenderer extends React.PureComponent {

    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel).isRequired
    }

    constructor(props) {
        super(props);
        this.reviewsSummary = this.props.offer.getReviewsSummary();
    }

    render() {
        return (
            <span className={[Style.textWithIcon, Style.offerSprite, Style["bbicons-user-rating"]].join(" ")}>
                {this.reviewsSummary.getAvgRating()}
            </span>
        );
    }
}