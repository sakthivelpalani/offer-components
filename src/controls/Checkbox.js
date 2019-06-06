import React from "react";
import PropTypes from "prop-types";
import "./Checkbox.scss";

export default class Checkbox extends React.PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        checked: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.any.isRequired,
    };

    render() {
        return (
            <React.Fragment>
                <input className="checkcontainer" type="checkbox" value={this.props.value}
                    name={this.props.name}
                    onChange={this.onChangeHandler}
                    checked={this.props.checked}
                    ref={(i) => this.instance = i}/>
                {this.props.name}
            </React.Fragment>
        );
    }

    onChangeHandler = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e, {checked: e.target.checked, value: this.props.value});
        }
    }
}