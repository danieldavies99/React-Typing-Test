import React from "react";
import "./App.css";

class TypingInput extends React.Component {
  state = { typed: "" };

  clear = async () => {
    //this.setState({typed: ""});

    await this.setState({ typed: "" });

    this.props.onTyped(this.state.typed);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  onTyped = async (e) => {
    await this.setState({ typed: e.target.value });

    this.props.onTyped(this.state.typed);
  };

  componentDidMount() {
    const inputBar = document.getElementById("inputBar");
    inputBar.onpaste = function (e) {
      e.preventDefault();
    };
  }

  focusBar = () => {
    this.refs.inputBar.focus();
  }
  
  render() {
    return (
      <form autoComplete="off" onSubmit={this.onFormSubmit}>
        <div>
          <input
            spellCheck="false"
            ref="inputBar"
            id="inputBar"
            autoFocus
            className="input"
            type="text"
            value={this.state.typed}
            onChange={this.onTyped}
          />
        </div>
      </form>
    );
  }

}

export default TypingInput;
