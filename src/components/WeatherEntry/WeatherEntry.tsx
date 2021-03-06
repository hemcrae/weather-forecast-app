import React from "react";
import "./WeatherEntry.scss";
import { Weather } from "../../model/WeatherModel";
import { getIconUrl } from "../../services/WeatherService";
import { unixToDate } from "../../utils/time.utils";

interface WeatherEntryProps {
  weather: Weather;
}

export const WeatherEntry: React.FC<WeatherEntryProps> = ({ weather }) => {
  return (
    <div className="entry">
      <div className="entry__time-wrap">
        <div className="entry__time">
          {unixToDate(weather.dt).toLocaleTimeString()}
        </div>
      </div>
      <div className="entry__wrap-bottom">
        <div className="entry__wrap">
          <div className="entry__temp">
            <h2 className="entry__current-temp">Temp: {weather.main.temp}℃</h2>
            <h3 className="entry__temp-range">
              Min/Max: {weather.main.temp_min}℃/{weather.main.temp_max}℃
            </h3>
            <h3 className="entry__humidity">
              Humidity: {weather.main.humidity}%
            </h3>
            <h3 className="entry__feels">
              Feels like: {weather.main.feels_like}℃
            </h3>
          </div>
        </div>
        {weather.weather.map((condition) => (
          <div className="entry__conditions" key={condition.id}>
            <img src={getIconUrl(condition.icon)} alt={condition.main} />
            {condition.description}
          </div>
        ))}
      </div>
    </div>
  );
};
