import React from "react";

import "../App.css";

class ErrorPage extends React.Component {

  render(props) {
    return (
      <div className="error">
          <h1>Error - Page not found!</h1>
          <p>sorry this page cannot be found.</p>
      </div>
    );
  }
  
}

export default ErrorPage;