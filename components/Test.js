import React from "react";

import TypingInput from "./TypingInput";
import TypingText from "./TypingText";

class Test extends React.Component {
  breaks = [];
  componentDidMount() {
    this.breaks = this.getLineBreaks();
  }

  state = { input: "", noWords: null, wpm: 0, accuracy: 100, penalty: 0 };
  getQuote = () => {
    return "Mathematics is the study of numbers, quantity, space, pattern, structure, and change. Mathematics is used throughout the world as an essential tool in many fields, including natural science, engineering, medicine, and the social sciences.";
  };

  getArrQuote = () => {
    let result = [];
    for (let i = 0; i < this.getQuote().length; i++) {
      result.push(<span id={`Q${i}`}>{this.getQuote()[i]}</span>);
    }
    return result;
  };

  getLineBreaks = () => {
    //this function is quite time consuming
    let breaks = [];
    let offsetTracker = [];
    for (let i = 0; i < this.getArrQuote().length; i++) {
      let currentSpan = document.getElementById(`Q${i}`);
      if (offsetTracker.length === 0) {
        offsetTracker.push(currentSpan.offsetTop);
      } else {
        let alreadyLogged = false;
        for (let j = 0; j < offsetTracker.length; j++) {
          if (currentSpan.offsetTop === offsetTracker[j]) {
            alreadyLogged = true;
          }
        }
        if (alreadyLogged === false) {
          breaks.push(i);
          offsetTracker.push(currentSpan.offsetTop);
        }
      }
    }
    return breaks;
  };

  timer = null;
  resetTimer = () => {
    let date = new Date();
    this.timer = date.getTime();
  };

  started = false;
  errorCount = 0;

  onTyped = (input) => {
    let noCorrect = 0;
    let noIncorrect = 0;
    if (input.length === 1 || this.started === false) {
      this.started = true;
      this.resetTimer();
    }

    let updateDate = new Date();
    let quote = this.getQuote();
    let result = [];

    if (input.length > this.getQuote().length) {
      let textOverflow = input.length - this.getQuote().length;
      input = input.slice(0, -textOverflow);
    }

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < this.breaks.length; j++) {
        if (i === this.breaks[j]) {
          result.push(<br />);
        }
      }
      if (input[i] === quote[i]) {
        result.push(<span className="correct">{input[i]}</span>);
        noCorrect++;
      } else {
        if (input[i] === " ") {
          result.push(<span className="incorrect">{"_"}</span>);
          noIncorrect++;
        } else {
          result.push(<span className="incorrect">{input[i]}</span>);
          noIncorrect++;
        }
      }
    }

    this.setState({ input: result });

    if (input.length != 0) {
      let noWords = Math.ceil(result.length / 5);
      if (noWords !== this.state.noWords && noWords > 2) {
        this.setState({ noWords });
        let elapsed = (updateDate.getTime() - this.timer) / 1000;

        //calulate gross wpm
        let wpm = noWords / (elapsed / 60);
        let penalty = noIncorrect / (elapsed / 60);
        wpm = Math.ceil(wpm - penalty);
        penalty = Math.ceil(penalty);
        this.setState({ penalty, wpm });
      }
      let accuracy = Math.ceil(100 * (noCorrect / (noCorrect + noIncorrect)));

      this.setState({ accuracy });
    } else {
      console.log("zero");
      this.setState({ accuracy: 100, wpm: 0, penalty: 0 });
    }
  };

  render(props) {
    return (
      <div className="main">
        <a href="https://en.wikipedia.org/wiki/Mathematics">
          <h1 className="title">Mathematics</h1>
        </a>
        <span className="outputText">{this.state.input}</span>
        <TypingText className="quote" quote={this.getArrQuote()} />
        <TypingInput onTyped={this.onTyped} quote={this.getQuote()} />
        <div className="statistic">WPM : {this.state.wpm} </div>
        <div className="statistic">Accuracy : {this.state.accuracy}%</div>
        <div className="statistic">Penalty : {this.state.penalty}WPM</div>
        <div className="author">Made by Daniel Davies - 2020</div>
      </div>
    );
  }
}

export default Test;
