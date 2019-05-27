import React from "react";
import PropTypes from "prop-types";

import ReviewsSummary from "../../domain/ReviewsSummary.js";
import Style from "./../../../styles/Offer-A/ReviewsSummary.scss";

export class RatingItemRenderer extends React.PureComponent {

    static propTypes = {
        domain: PropTypes.instanceOf(ReviewsSummary).isRequired
    }

    render() {
        return (
            <span className={[Style.textWithIcon, Style.offerSprite, Style.UserRating, Style.bbiconsUserRating].join(" ")}>
                {this.props.domain.getAvgRating()}
            </span>
        );
    }
}