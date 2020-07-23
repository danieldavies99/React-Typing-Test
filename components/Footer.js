import React from "react";

class Footer extends React.Component {
    render(props) {
        return (
        <div>
            <div className="footerGrid">
            <div className="footerContent">
                <div className="footerHeader">Contact</div>
                <div className="footerText">something@something.com</div>
                <div className="footerText">facebook</div>
                <div className="footerText">discord</div>
            </div>
            <div className="footerContent">
                <div className="footerHeader">About</div>
                <div className="footerText">faq</div>
                <div className="footerText">something else</div>
            </div>
            </div>
            <div className="footerContent disclaimer">CopyRight © Daniel Davies 2020 all rights reserved.</div>
        </div>
        );
      }
}
export default Footer;