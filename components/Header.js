import React from "react";
import {Link} from 'react-router-dom';
import smallLogo from './logo-small.png';
import "./App.css";

class Header extends React.Component {
    render(props) {
        return (
        <div className="header">
          <Link to="/">
            <img  style = {{ imageRendering: "pixelated", verticalAlign: "Bottom", margin: 15 + "px"}} src={smallLogo} alt="large logo"/>
            <h1>WikiType.io</h1>
          </Link>
          <Link to="/"><h2>Typing Practice</h2></Link>
          <Link to="/about"><h2>About</h2></Link>
        </div>
        );
      }
}

export default Header;