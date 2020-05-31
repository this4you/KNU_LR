import React, { Component } from "react";
import Header from "./Header";
import WeatherZone from "./WeatherZone";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Dashboards extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!cookies.get('user')) {
          this.props.history.push("/home");
       }
      }
    render() {
        const history = this.props.history;
        return (
            <div>
                <Header history = {history}/>
                <WeatherZone/>
            </div>
        );
    }
}

export default Dashboards;