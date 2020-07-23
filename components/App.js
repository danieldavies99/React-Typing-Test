import React from "react";
import { Route, Switch } from 'react-router-dom';

import "./App.css";
import TestPage from "./Pages/TestPage";
import ErrorPage from "./Pages/ErrorPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";

import Footer from "./Footer";
import Header from "./Header";

class App extends React.Component {
  render(props) {
    return (
      <div className="siteContainer">
        <Header />
        <div className="main">
          <Switch>
            <Route path="/" component={TestPage} exact/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/contact" component={ContactPage}/>
            <Route component={ErrorPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
