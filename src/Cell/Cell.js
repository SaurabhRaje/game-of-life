import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alive: Math.random() > 0.85
        };
    }

    componentWillUpdate(nextProps) {
        if (this.props.size !== nextProps.size) {
            this.setState({
                alive: Math.random() > 0.85
            });
        }
    }

    toggleLife = () => {
        this.setState({
            alive: !this.state.alive
        });
    };

    render() {
        this.size = 70 / this.props.size + "vw";
        return (
            <td className={"Cell" + (this.state.alive ? " Cell--alive" : "")} onClick={this.toggleLife} style={{width: this.size, height: this.size}}/>
        );
    }
}

Cell.propTypes = {
    size: PropTypes.number.isRequired
};

export default Cell;
