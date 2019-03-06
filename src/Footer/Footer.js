import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="Footer">
            <span className="Footer-text">&copy; 2019 Saurabh Raje</span>
            &nbsp;&middot;&nbsp;
            <a className="Footer-link" href="https://github.com/SaurabhRaje/game-of-life" target="_blank">GitHub</a>
        </footer>
    );
};

export default Footer;
