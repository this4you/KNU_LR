import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";

const WeatherDay = (props) => {
    
    const day = props.day;
    const img = `https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`
    const header = dateFormat(new Date(day.applicable_date), "dddd, d/m/yy")
    return (
        <li>
            <h1>{header}</h1>
            <img src={img} alt="React Logo" />
            <h2>{day.weather_state_name}</h2>
            <h2>Max {day.max_temp.toString().split('.')[0]}°C</h2>
            <h2>Min {day.min_temp.toString().split('.')[0]}°C</h2>
        </li>
    );
}

export default WeatherDay;