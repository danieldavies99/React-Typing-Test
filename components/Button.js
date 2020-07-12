import React from "react";
import "./App.css";

class Button extends React.Component {

    onClicked = () => {
        this.props.onClicked();
    }

    render(props){
        return (
        <div onClick = {this.onClicked} className = "button">{this.props.buttonText}</div>
        );
    }
}

export default Button;