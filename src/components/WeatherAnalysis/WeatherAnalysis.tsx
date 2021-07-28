import React, { useEffect, useState } from "react";
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
      <div className="analysis__wrap-top">
        <h2 className="analysis__name">{city.name}</h2>
        <WeatherEntry weather={weather} />
      </div>
      <div className="analysis__wrap-bottom">
        <h2 className="analysis__forecast">Forecast</h2>
        <ol className="analysis__list">
          {forecast?.list.map((timePoint) => (
            <li className="analysis__list-item" key={timePoint.dt}>
              <WeatherEntry weather={timePoint} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
