import React from "react";
import PropTypes from "prop-types";

export default class Checkbox extends React.PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        checked: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.any.isRequired,
    };

    render() {
        return (
            <span className="checkboxBtnStyle">
                <input type="checkbox" value={this.props.value}
                    name={this.props.name} 
                    onChange={this.onChangeHandler} 
                    checked={this.props.checked}
                    ref={(i) => this.instance = i}/>
                <span className="firstIcon"></span>
                <span className="secondIcon">
                    <span className="secondIconStem"></span>
                    <span className="secondIconKick"></span>
                </span>
            </span>
        );
    }

    onChangeHandler = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e, {checked: e.target.checked, value: this.props.value});
        }
    }
}