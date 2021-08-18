import React from "react";
import "./CurrentWeather.scss";
import { City, Weather } from "../../model/WeatherModel";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";

interface CurrentWeatherProps {
  city: City | null;
  weather: Weather | null;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  weather,
}) => {
  if (!city || !weather) {
    return null;
  }

  return (
    <div className="current">
      <h2 className="current__name">{city.name}</h2>
      <h3 className="current__heading">Current Weather</h3>
      <WeatherEntry weather={weather} />
    </div>
  );
};
