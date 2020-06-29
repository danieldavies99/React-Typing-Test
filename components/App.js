import React from "react";
import axios from "axios";

import "./App.css";
import Test from "./Test";

class App extends React.Component {
  render(props) {
    return (
      <div className="container">
        <Test />
      </div>
    );
  }
}
export default App;
