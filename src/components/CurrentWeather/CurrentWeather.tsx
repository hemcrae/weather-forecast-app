import React, { useEffect, useState, useRef } from "react";
import "./CurrentWeather.scss";
import { City, Weather } from "../../model/WeatherModel";
import { fetchWeather } from "../../services/WeatherService";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";

interface CurrentWeatherProps {
  city: City | null;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city }) => {
  const [weather, setWeather] = useState<Weather | undefined>();

  useEffect(() => {
    (async function () {
      if (city) {
        const [weather, forecast] = await Promise.all([fetchWeather(city.id)]);
        if (weather) {
          setWeather(weather);
        }
        if (forecast) {
          console.log(forecast);
        }
      }
    })();
  }, [city]);

  if (!city || !weather) {
    return null;
  }

  return (
    <div className="current">
      <h2 className="name">{city.name}</h2>
      <h3 className="current__heading">Current Weather</h3>
      <WeatherEntry weather={weather} />
    </div>
  );
};
