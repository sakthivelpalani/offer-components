import React from "react";
import PropTypes from "prop-types";

import ReviewsSummary from "../../domain/ReviewsSummary";

export class RatingItemRenderer extends React.PureComponent {

    static props = {
        domain: PropTypes.instanceOf(ReviewsSummary)
    }

    render() {
        return (
            <span>
                {this.props.domain.getAvgRating()}
            </span>
        );
    }

    static requiredDomain() {
        return "ReviewsSummary";
    }
}