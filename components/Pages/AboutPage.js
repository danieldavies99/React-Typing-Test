import React from "react";

import "../App.css";

class AboutPage extends React.Component {

  render(props) {
    return (
      <div className="about">
        <h1>Why Learn To Touch Type?</h1>
        <p>Touch typing is quickly becoming an <strong>essential skill</strong>. A faster typing speed can improve your productivity and help you get more done. Employers in many fields favor candidates who can touch type over those who cannot.</p>
        <h1>About WikiType</h1>
        <p>I designed this website to help people improve their typing speed and learn about new topics they may not have encountered otherwise. All quotes on this site come from a selection of the most visited wikipedia pages.</p>
        <h1>WPM? Corrected Accuracy vs Actual Accuracy? What do these terms mean?</h1>
        <p><strong>WPM</strong></p>
        <p>WPM stands for <i>Words Per Minute</i>, it is a popular measure of typing speed. As the name suggests, it is an approximation of the number of words that someone can type in the space of a minute.</p>
        <p><strong>Corrected Accuracy</strong></p>
        <p><i>Corrected Accuracy</i> is the percentage of characters typed that match with the original quote. If a wrong letter is typed but then replaced with the correct letter that error will <strong>not</strong> be included in your corrected accuracy score.<br /> Your corrected accuracy score will be taken into account while calculating your WPM therefore it is advisable to correct any errors you make.</p>
        <p><strong>Actual Accuracy</strong></p>
        <p><i>Actual Accuracy</i> is the percentage of all characters typed that were the expected input. Correcting your mistakes will not affect your actual accuracy.</p>
        <h1>About The Author</h1>
        <p>My name is Daniel Davies, I am a web designer/programmer and fellow touch typer from Liverpool, England. I designed this site in order to help people improve their touch typing speed by practicing with interesting and informative quotes. I am always looking to improve this site, if you have any suggestions or feedback I would love to hear from you! My email is <strong>dan@dfordevelop.com</strong>.</p>
      </div>
    );
  }
  
}
export default AboutPage;