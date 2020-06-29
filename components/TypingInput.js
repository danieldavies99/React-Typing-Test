import React from "react";
import "./App.css";

class TypingInput extends React.Component {
  state = { typed: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
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

  render() {
    return (
      <div className="input">
        <form autoComplete="off" onSubmit={this.onFormSubmit}>
          <div>
            <input
              id="inputBar"
              autoFocus
              className="typed"
              type="text"
              value={this.state.typed}
              onChange={this.onTyped}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default TypingInput;
