import React from "react";
import largeLogo from './logo-large.png';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
    render(props) {
        return (
        <div>
            <div className="footerGrid">
                <div className="footerContent">
                    <img src={largeLogo} alt="large logo" width="150"/>
                </div>
                <div className="footerContent">
                    <div className="footerHeader">Contact</div>
                    <div className="footerText">dan@dfordevelop.com</div>
                </div>
                <div className="footerContent">
                    <div className="footerHeader">About</div>
                    <Link to="/about"><div className="footerText">Test Information</div></Link>
                    <div className="footerText">Version 1.0</div>
                    {/*<div className="footerText">Privacy Policy</div>*/}
                </div>
            </div>
            <div className="footerContent disclaimer">CopyRight © Daniel Davies 2020 all rights reserved.</div>
        </div>
        );
      }
}
export default Footer;