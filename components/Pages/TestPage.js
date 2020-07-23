import React from "react";

import "../App.css";
import Test from "../Test";

class TestPage extends React.Component {

  render(props) {
    return (
      <div>
        <Test noArticles="100" />
        <div className="infoGrid">
        <div className="infoGridColumn">
            <h2>Want to learn more?</h2>
            <p>This typing test uses quotes from a selection of the most visited english language Wikipedia pages.</p>
            <p>You can visit the corresponding wikipedia article for each quote by clicking on it's title (page will open in a new tab).</p>
        </div>
        <div className="infoGridColumn">
            <h2>Typing Test Info</h2>
            <p>The test starts as soon as you start typing and is finished when the last character of the quote is typed.</p>
            <p>Words per minute (WPM) is a measure of typing speed. It is an approximation of how many words could be typed in the space of one minute.</p>
            <p>Your WPM takes into account all mistakes that are left uncorrected. Error penalties can dramatically reduce your speed.</p>
        </div>
        </div>
      </div>
    );
  }
  
}

export default TestPage;
