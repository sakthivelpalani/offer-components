import React from "react";
import PropTypes from "prop-types";

import Bank from "../../domain/Bank";

export class BankColumnRenderer extends React.PureComponent {

    static propTypes = {
        domain: PropTypes.instanceOf(Bank)
    }

    render() {
        return (
            <div>
                {this.props.domain.getId()}
                <br/>
                {this.props.domain.getName()}
            </div>
        );
    }
}