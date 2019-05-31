import React from "react";
import PropTypes from "prop-types";

import {default as OfferModel} from "../../model/OfferModel";

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
            <span>
                {this.reviewsSummary.getAvgRating()}
            </span>
        );
    }
}