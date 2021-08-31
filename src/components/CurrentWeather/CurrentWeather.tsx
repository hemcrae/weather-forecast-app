import React from "react";
import "./CurrentWeather.scss";
import { City, Weather } from "../../model/WeatherModel";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

interface CurrentWeatherProps {
  city: City | null;
  weather: Weather | null;
  scrollTo: (value: number) => void;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  weather,
  scrollTo,
}) => {
  if (!city || !weather) {
    return null;
  }

  return (
    <div className="current">
      <button className="current__scroll-up">
        <KeyboardArrowUpIcon onClick={() => scrollTo(0)} fontSize="large" />
      </button>
      <div className="current__wrap">
        <h2 className="current__name">{city.name}</h2>
        <h3 className="current__heading">Current Weather</h3>
        <WeatherEntry weather={weather} />
      </div>
      <button className="current__scroll-down">
        <KeyboardArrowDownIcon
          onClick={() => scrollTo(window.innerHeight * 2)}
          fontSize="large"
        />
      </button>
    </div>
  );
};
