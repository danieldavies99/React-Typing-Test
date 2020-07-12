import React from "react";

import TypingInput from "./TypingInput";
import TypingText from "./TypingText";
import Button from "./Button";


class Test extends React.Component {

  state = {
    quoteLink: "/",
    quoteTitle: "Loading",
    quoteText: "Please Wait...",
    input: "",
    noWords: null,
    wpm: 0,
    accuracy: 100,
    penalty: 0,
  };

  breaks = [];
  componentDidMount() {
    this.generateQuote();
  }

  generateQuote = () => {
    let randomNumber = Math.floor(
      Math.random() * parseInt(this.props.noArticles)
    );

    let articleObj = {};

    const url = `http://localhost:8080/data/${randomNumber}`;

    const othePram = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };

    fetch(url, othePram)
      .then((data) => {
        return data.text();
      })
      .then((res) => {
        articleObj = JSON.parse(res);
        this.setState(
          {
            quoteText: articleObj.description.toString(),
            quoteTitle: articleObj.title,
            quoteLink: articleObj.link,
          },
          () => {
            console.log(this.props.noArticles);
            this.breaks = this.getLineBreaks();
          }
        );
      });
  };

  getArrQuote = () => {
    let result = [];
    for (let i = 0; i < this.state.quoteText.length; i++) {
      result.push(
        <span key={`Q${i}`} id={`Q${i}`}>
          {this.state.quoteText[i]}
        </span>
      );
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
    let quote = this.state.quoteText;
    let result = [];

    if (input.length > quote.length) {
      let textOverflow = input.length - quote.length;
      input = input.slice(0, -textOverflow);
    }

    for (let i = 0; i < input.length; i++) {
      //console.log(`Typed : ${input[i]}, expected ${quote[i]}`);
      for (let j = 0; j < this.breaks.length; j++) {
        if (i === this.breaks[j]) {
          result.push(<br key={`BR${i}`} />);
        }
      }
      if (input[i] === quote[i]) {
        result.push(
          <span key={`I${i}`} className="resultText correct">
            {input[i]}
          </span>
        );
        noCorrect++;
      } else {
        if (input[i] === " ") {
          result.push(
            <span key={`I${i}`} className="resultText incorrect">
              {"_"}
            </span>
          );
          noIncorrect++;
        } else {
          result.push(
            <span key={`I${i}`} className="resultText incorrect">
              {input[i]}
            </span>
          );
          noIncorrect++;
        }
      }
    }

    this.setState({ input: result });

    if (input.length !== 0) {
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
      //console.log("zero");
      this.setState({ accuracy: 100, wpm: 0, penalty: 0 });
    }
  };

  onReset = () => {
    //console.log("Reset Clicked!");
    this.clearInput();
    this.refocus();
  }

  onNewQuote = () => {
    //console.log("New Quote Clicked!");
    this.generateQuote(); 
    this.clearInput();
    this.refocus();
  }

  clearInput = () => {
    this.refs.barInput.clear();
  }

  refocus = () => {
    this.refs.barInput.focusBar();
  }

  render(props) {
    return (
      <div className="main">
        <a href={this.state.quoteLink}>
          <h1 className="title">{this.state.quoteTitle}</h1>
        </a>
        <span className="outputText">{this.state.input}</span>
        <TypingText className="quote" quote={this.getArrQuote()} />
        <TypingInput ref="barInput" onTyped={this.onTyped} quote={this.state.quoteText} />
        <div className="buttons">
          <Button onClicked={this.onNewQuote} buttonText="New Quote"/>
          <Button onClicked={this.onReset} buttonText="Start Over"/>
        </div>
        <div className="statistic">WPM : {this.state.wpm} </div>
        <div className="statistic">Accuracy : {this.state.accuracy}%</div>
        <div className="statistic">Penalty : {this.state.penalty}WPM</div>
        <div className="author">Made by Daniel Davies - 2020</div>
      </div>
    );
  }
}


export default Test;
