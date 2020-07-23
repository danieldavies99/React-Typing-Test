import React from "react";

class TypingText extends React.Component {
  render(props) {
    return <div id="quoteArea">{this.props.quote}</div>;
  }
}

export default TypingText;
