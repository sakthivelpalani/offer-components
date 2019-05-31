import React from "react";
import PropTypes from "prop-types";
import {find, concat, filter} from "lodash";

import BankDomain from "../../../domain/Bank.js";
import Checkbox from "../../../../controls/Checkbox.js";

export default class BankFilterRenderer extends React.PureComponent {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.instanceOf(BankDomain)).isRequired,
        onChange: PropTypes.func.isRequired
    }

    state = {
        selectedOptions: []
    }

    render() {
        const filterItems = this.props.options.map((option) => {
            const checkbox = <Checkbox key={"bankFilter" + option.getId()} 
                name={option.getName()} value={option.getId()} onChange={this.onFilterItemChange}/>;
            return checkbox;
        });
        return <div>{filterItems}</div>;
    }
    onFilterItemChange = (e, data) => {
        const changedOption = find(this.props.options, 
            (option) => option.getId() == data.value);
        let newSelectedOptions;
        if (data.checked) {
            newSelectedOptions = concat(this.state.selectedOptions, changedOption);
        } else {
            newSelectedOptions = filter(this.state.selectedOptions, (selectedOption) => selectedOption.getId() != changedOption.getId());
        }
        this.setState({selectedOptions: newSelectedOptions}, () => this.props.onChange(this.state.selectedOptions));
    }
}