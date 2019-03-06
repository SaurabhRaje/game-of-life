import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";
import Cell from "../Cell/Cell";

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            generations: 0
        };
    }

    grid = [];
    size = {
        "Small":  { "rows": 28, "cols": 56 },
        "Medium": { "rows": 35, "cols": 70 },
        "Large":  { "rows": 42, "cols": 84 }
    };
    speed = {
        "Slow": 1500,
        "Medium": 1000,
        "Fast": 500
    };

    componentDidMount() {
        this.setNeighbours();
    }

    componentDidUpdate(prevProps) {
        if (this.props.size !== prevProps.size) {
            this.setNeighbours();
        }
    }

    setNeighbours = () => {
        for (let i = 0; i < this.maxRows; i++) {
            for (let j = 0; j < this.maxCols; j++) {
                let x1 = i > 0 ? i - 1 : this.maxRows - 1,
                    y1 = j > 0 ? j - 1 : this.maxCols - 1,
                    x2 = i < this.maxRows - 1 ? i + 1 : 0,
                    y2 = j < this.maxCols - 1 ? j + 1 : 0;
                let neighbours = [
                    this.grid[x1][y1],
                    this.grid[x1][j],
                    this.grid[x1][y2],
                    this.grid[i][y1],
                    this.grid[i][y2],
                    this.grid[x2][y1],
                    this.grid[x2][j],
                    this.grid[x2][y2]
                ];
                this.grid[i][j].neighbours = neighbours;
            }
        }
    };

    resetGrid = () => {
        for (let i = 0; i < this.maxRows; i++) {
            for (let j = 0; j < this.maxCols; j++) {
                let currentCell = this.grid[i][j];
                if (currentCell.state.alive) {
                    currentCell.setState({
                        alive: false
                    });
                }
            }
        }
        this.setState({
            generations: 0
        });
    };

    updateGrid = (updates) => {
        for (let update of updates) {
            this.grid[update.i][update.j].setState({
                alive: update.state
            });
        }
    };

    advanceGeneration = () => {
        let updates = [];
        for (let i = 0; i < this.maxRows; i++) {
            for (let j = 0; j < this.maxCols; j++) {
                let currentCell = this.grid[i][j],
                    aliveNeighbours = currentCell.neighbours.reduce((acc, neighbour) => {
                        return neighbour.state.alive ? acc + 1 : acc;
                    }, 0);
                if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                    if (currentCell.state.alive) {
                        updates.push({i, j, state: false});
                    }
                }
                else if (aliveNeighbours === 3) {
                    if (!currentCell.state.alive) {
                        updates.push({i, j, state: true});
                    }
                }
            }
        }
        this.updateGrid(updates);
        this.setState({
            generations: this.state.generations + 1
        });
    };

    renderCells = (i) => {
        let cells = [];
        for (let j = 0; j < this.maxCols; j++) {
            cells[j] = <Cell key={"x" + j + "y" + i} ref={node => this.grid[i][j] = node} size={this.maxCols}/>;
        }
        return cells;
    };

    renderRows = () => {
        let rows = [];
        for (let i = 0; i < this.maxRows; i++) {
            this.grid[i] = [];
            rows[i] = <tr key={"r" + i}>{this.renderCells(i)}</tr>;
        }
        return rows;
    };

    render() {
        this.maxRows = this.size[this.props.size].rows;
        this.maxCols = this.size[this.props.size].cols;

        clearInterval(this.tick);
        if (this.props.play) {
            this.tick = setInterval(() => {
                this.advanceGeneration();
            }, this.speed[this.props.speed]);
        }

        return (
            <div className="Grid">
                <table className="Grid-table">
                    <caption className="Grid-caption">
                        Generations: <span className="Grid-generations">{this.state.generations}</span>
                    </caption>
                    <tbody className="Grid-body">
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

Grid.propTypes = {
    size: PropTypes.string,
    speed: PropTypes.string,
    play: PropTypes.bool
};

Grid.defaultProps = {
    size: "Small",
    speed: "Fast",
    play: true
};

export default Grid;
