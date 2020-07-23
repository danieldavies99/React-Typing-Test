import React from "react";
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

import TypingInput from "./TypingInput";
import TypingText from "./TypingText";
import Button from "./Button";

import "./App.css";


class Test extends React.Component {

  state = {
    quoteLink: "/",
    quoteTitle: "Loading",
    quoteText: "Please Wait...",
    input: "",
    noWords: null,
    wpm: 0,
    correctedAccuracy: 100,
    actualAccuracy: 100,
    penalty: 0,
    articleNumber: 0
  };

  finished = true;
  lastTenScores = [];
  breaks = [];
  componentDidMount() {
    this.generateQuote();
    if (localStorage.hasOwnProperty("lastScores")) {
      this.lastTenScores = JSON.parse(localStorage.getItem("lastScores"));
    }
    else {
      this.lastTenScores = [0,0,0,0,0,0,0,0,0,0];
    }
    this.updateChart();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }
  
  quoteSave = "";
  generateQuote = () => {
    let randomNumber = Math.floor(
      Math.random() * parseInt(this.props.noArticles)
    );

    let articleObj = {};

    const url = `https://stark-reef-57528.herokuapp.com/data/${randomNumber}`;

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
            articleNumber: randomNumber + 1
          },
          () => {
            this.breaks = this.getLineBreaks();
            this.clearInput();
            this.finished = false;
            this.quoteSave = this.state.quoteText;
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
  lastLength = 0;
  actualCorrect = 0;
  actualWrong = 0;

  onTyped = (input) => {

    if ( this.finished === false)
    {
    let noCorrect = 0;
    let noIncorrect = 0;
    if (input.length === 1 || this.started === false) {
      this.actualCorrect = 0;
      this.actualWrong = 0;
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

    if(this.lastLength < input.length) {
        if(input[input.length - 1] === quote[input.length - 1]){
          this.actualCorrect++;
        }
        else {
          this.actualWrong++;
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
        wpm = Math.ceil( (wpm - penalty ) * 100) / 100;
        if(wpm < 0) wpm = 0;
        penalty = Math.ceil(penalty);
        this.setState({ penalty, wpm });
      }
      let correctedAccuracy = Math.ceil(100 * (noCorrect / (noCorrect + noIncorrect)) * 100) / 100;
      let actualAccuracy = Math.ceil( 100* (this.actualCorrect / (this.actualWrong + this.actualCorrect) ) * 100 ) / 100;

      this.setState({ correctedAccuracy, actualAccuracy });
    } else {
      this.setState({ actualAccuracy: 100, correctedAccuracy: 100, wpm: 0, penalty: 0 }); //0 characters typed
    }
    
    if(input.length === quote.length ) {
      this.finished = true;
      this.onFinish(this.state.wpm);
    }

    this.lastLength = input.length;
  }
  };

  onReset = () => {
    this.setState({quoteText: this.quoteSave})
    this.clearInput();
    this.refocus();
    this.finished = false;
  }

  onNewQuote = () => {
    this.finished = true;
    this.setState({    quoteLink: "/",
    input: "",
    quoteTitle: "Loading",
    quoteText: "Please Wait...",
    articleNumber: "." });
    this.generateQuote(); 
    this.clearInput();
    this.refocus();
  }

  onFinish = (finishedWPM) => {
    this.lastTenScores.push(finishedWPM);
    this.updateChart();
    this.forceUpdate();
    this.setState({input: "", quoteText: "Test Complete! Click on new quote or press enter to begin a new test."});
  }
  
  onSubmit = () => {
    if(this.finished === true) this.onNewQuote();
  }
  
  chartData = [];
  updateChart = () => {
    this.chartData = [];
    if(this.lastTenScores.length > 10) {
      this.lastTenScores.shift();
    }
    for(let i = 0; i < this.lastTenScores.length; i++){
    let newElement = {num: i+1, WPM: this.lastTenScores[i]};
    this.chartData.push(newElement);
    }
  }

  saveStateToLocalStorage() {
    let lastScores = this.lastTenScores;
    localStorage.setItem("lastScores", JSON.stringify(lastScores));
  }

  clearInput = () => {
    this.refs.barInput.clear();
  }

  refocus = () => {
    this.refs.barInput.focusBar();
  }

  render(props) {
    return (
      <div>
        <div className="gridMain">
          <div className="gridTest">
            <h1 id="articleNumber">#{this.state.articleNumber}/{this.props.noArticles}</h1>
            <a target="_blank" rel="noopener noreferrer" href={this.state.quoteLink}>
              <h1 className="title">{this.state.quoteTitle}</h1>
            </a>
            <span className="outputText">{this.state.input}</span>
            <TypingText className="quote" quote={this.getArrQuote()} />
            <div className="testBottomWrapper">
              <TypingInput ref="barInput" onSubmit={this.onSubmit} onTyped={this.onTyped} quote={this.state.quoteText} />
              <div className="buttons">
                <Button onClicked={this.onNewQuote} buttonText="New Quote"/>
                <Button onClicked={this.onReset} buttonText="Start Over"/>
              </div>
            </div>
          </div>
            <div className="gridStats">
              <div className="statGrid">
                <div className="statistic"> <p className="statTitle">WPM</p> <p className="statNumber">{this.state.wpm}</p> </div>
                <div className="statistic"> <p className="statTitle">Accuracy (Actual)</p> <p className="statNumber">{this.state.actualAccuracy}%</p></div>
                <div className="statistic"> <p className="statTitle">Accuracy (Corrected)</p> <p className="statNumber">{this.state.correctedAccuracy}%</p></div>
                <div className="statistic"> <p className="statTitle">Penalty</p> <p className="statNumber">{this.state.penalty}</p></div>
            </div>
          </div>
        </div>
        <div className="chartContainer">
        <h2>Words Per Minute - last ten games</h2>
          <ResponsiveContainer>
            <LineChart className = "chart" margin={{ top: 0, right: 0, left: -25, bottom: 0}} data={this.chartData}>
              <Line type="monotone" dataKey="WPM" stroke="#66999b" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <YAxis dataKey="WPM"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}


export default Test;
