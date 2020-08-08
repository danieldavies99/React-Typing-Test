import React from "react";
import { Route, Switch } from 'react-router-dom';

import "./App.css";
import TestPage from "./Pages/TestPage";
import ErrorPage from "./Pages/ErrorPage";
import AboutPage from "./Pages/AboutPage";
import CookieConsent from "react-cookie-consent";
//import ContactPage from "./Pages/ContactPage";

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
            <Route component={ErrorPage} />
          </Switch>
        </div>
        <CookieConsent buttonStyle={{ backgroundColor: "#66999b", color: "white"}} style={{ fontFamily: "Roboto,sans-serif" }}>This website uses cookies to enhance the user experience.</CookieConsent>
        <Footer />
      </div>
    );
  }
}
export default App;
