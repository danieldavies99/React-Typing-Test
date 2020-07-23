import React from "react";
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render(props) {
        return (
        <div className="header">
          <div className="headerGrid">
            <Link to="/"><h1>WikiType.io</h1></Link>
            <Link to="/"><h2>Typing Test</h2></Link>
            <Link to="/about"><h2>About</h2></Link>
            <Link to="/contact"><h2>Contact</h2></Link>
          </div>
        </div>
        );
      }
}

export default Header;