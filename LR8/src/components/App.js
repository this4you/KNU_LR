import React, { Component } from "react";
import '../styles/app.css';
import Home from './Home/Home';
import Dashboards from './Dashboards/Dashboards';

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { history } = this.props;
        return (
            <div className="App">
                <Switch>
                    <Route history = {history} path='/home' component={Home} />
                    <Route history = {history} path='/dashboards' component={Dashboards} />
                    <Redirect from='/' to='/home' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App)