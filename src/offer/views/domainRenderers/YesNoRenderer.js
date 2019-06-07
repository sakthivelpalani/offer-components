import React from "react";
import PropTypes from "prop-types";

export default class YesNoRenderer extends React.PureComponent {
    static propTypes = {
        domain: PropTypes.bool.isRequired
    }

    render() {
        if (this.props.domain) {
            return <div>Yes</div>;
        } else {
            return <div>No</div>;
        }
    }
}