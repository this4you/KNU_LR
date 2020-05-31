import React, { Component } from "react";
import LoginForm from "./LoginForm";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { history } = this.props;
        return (
            <div className = "home-section">
                <LoginForm history = {history}></LoginForm>
            </div>
        );
    }
}

export default Home;