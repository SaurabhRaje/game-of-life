import React from "react";
import PropTypes from "prop-types";
import "./Switcher.css";

class Switcher extends React.Component {
    switchOption = (event) => {
        this.props.onSwitch(event.target.value);
    };

    render() {
        return (
            <div className="Switcher">
                {this.props.options.map((option, i, arr) => {
                    return (
                        <label className={"Switcher-option" + (option === this.props.defaultOption ? " Switcher-option--active" : "")} key={option}>
                            <input type="radio" className="Switcher-radio" name={arr.join("")} value={option} defaultChecked={option === this.props.defaultOption} onChange={this.switchOption}/>
                            <span className="Switcher-value">{option}</span>
                        </label>
                    );
                })}
            </div>
        );
    }
}

Switcher.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSwitch: PropTypes.func.isRequired,
    defaultOption: PropTypes.string
};

export default Switcher;
