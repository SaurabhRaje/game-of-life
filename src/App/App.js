import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Grid from "../Grid/Grid";
import Switcher from "../Switcher/Switcher";
import Footer from "../Footer/Footer";

// import logo from "./logo.svg";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: true,
            size: "Small",
            speed: "Fast"
        };
    }

    updateSize = (size) => {
        this.resetGame();
        this.setState({
            playing: true,
            size
        });
    };

    updateSpeed = (speed) => {
        this.setState({
            speed
        });
    };

    togglePlay = () => {
        this.setState({
            playing: !this.state.playing
        });
    };

    resetGame = () => {
        this.setState({
            playing: false
        });
        this.grid.resetGrid();
    };

    render() {
        return (
            <div className="App">
                <Header/>
                <main className="App-main">
                    <Grid ref={node => this.grid = node} size={this.state.size} speed={this.state.speed} play={this.state.playing}/>
                    <Switcher options={["Small", "Medium", "Large"]} defaultOption={this.state.size} onSwitch={this.updateSize}/>
                    <Switcher options={["Slow", "Medium", "Fast"]} defaultOption={this.state.speed} onSwitch={this.updateSpeed}/>
                    <input type="button" className="App-button" value={this.state.playing ? "Pause" : "Play"} onClick={this.togglePlay}/>
                    <input type="button" className="App-button" value="Reset" onClick={this.resetGame}/>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default App;
