import React, { Component } from "react";
import WeatherDay from "./WeatherDay";

class WeatherZone extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoaded: false, data: null, error: null };
        this.getWeatherByLocation = this.getWeatherByLocation.bind(this);
        this.getWoeidByLocation = this.getWoeidByLocation.bind(this);
    }
    componentDidMount() {
        var self = this;
        if(!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
            this.getWeatherByLocation();
          } else {
             console.log('Locating…');
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                debugger;
            }, function (error) {
                self.getWeatherByLocation();
            });
        }
    }

    getWoeidByLocation(latitude, longitude) {
        
    }

    getWeatherByLocation(woeid) {
        woeid = woeid || '924938';
        fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const { error, data, isLoaded } = this.state;
        if (error) {
            return <div className='ErrorMessage'>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className='Loader'>Loading...</div>
        } else {
            var days = data.consolidated_weather.slice(0, data.consolidated_weather.length-1);
            return (
                <div className= "main-section">
                    <div className="city">
                        <h1>{data.title}, {data.parent.title}</h1>
                    </div>
                    <div className="weather">
                        <ul id="weather-section">
                        {days.map(item => (
                            <WeatherDay key= {item.id} day={item}/>
                        ))}
                        </ul>
                    </div>
                </div>
            );
        }
    }
}

export default WeatherZone;