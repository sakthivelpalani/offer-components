import React from "react";
import PropTypes from "prop-types";

import ReviewsSummary from "../../domain/ReviewsSummary.js";

export class RatingItemRenderer extends React.PureComponent {

    static propTypes = {
        domain: PropTypes.instanceOf(ReviewsSummary).isRequired
    }

    render() {
        return (
            <span>
                {this.props.domain.getAvgRating()}
            </span>
        );
    }
}