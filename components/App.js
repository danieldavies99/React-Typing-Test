import React from "react";

import "./App.css";
import Test from "./Test";

class App extends React.Component {
  render(props) {
    return (
      <div className="siteContainer">
        <div className="header">
          <h1 className="siteTitle">WikiType.io</h1>
        </div>
        <div className="container">
          <Test noArticles="50" />
        </div>
      </div>
    );
  }
}
export default App;
