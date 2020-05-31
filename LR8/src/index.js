
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
const history = createBrowserHistory()

ReactDOM.render(
    <BrowserRouter>
        <App history = {history} />
    </BrowserRouter>, document.getElementById("root"));