import React, { useEffect, useState } from "react";
import "./WeatherAnalysis.scss";
import { City, Forecast, Weather } from "../../model/WeatherModel";
import { fetchForecast, fetchWeather } from "../../services/WeatherService";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";

interface WeatherAnalysisProps {
  city: City | null;
}

export const WeatherAnalysis: React.FC<WeatherAnalysisProps> = ({ city }) => {
  const [weather, setWeather] = useState<Weather | undefined>();
  const [forecast, setForecast] = useState<Forecast | undefined>();

  useEffect(() => {
    (async function () {
      if (city) {
        const [weather, forecast] = await Promise.all([
          fetchWeather(city.id),
          fetchForecast(city.id),
        ]);
        if (weather) {
          setWeather(weather);
        }
        if (forecast) {
          console.log(forecast);
          setForecast(forecast);
        }
      }
    })();
  }, [city]);

  if (!city || !weather || !forecast) {
    return null;
  }

  return (
    <div className="analysis">
      <div className="current">
        <h2 className="current__name">{city.name}</h2>
        <h3 className="current__heading">Current Weather</h3>
        <WeatherEntry weather={weather} />
      </div>
      <div className="forecast">
        <h3 className="forecast__heading">Forecast</h3>
        <ol className="forecast__list">
          {forecast?.list.map((timePoint) => (
            <li className="forecast__list-item" key={timePoint.dt}>
              <WeatherEntry weather={timePoint} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
