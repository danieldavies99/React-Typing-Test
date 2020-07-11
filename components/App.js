import React from "react";

import "./App.css";
import Test from "./Test";

class App extends React.Component {
  render(props) {
    return (
      <div className="container">
        <Test noArticles="16" />
      </div>
    );
  }
}
export default App;
