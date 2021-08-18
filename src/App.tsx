import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import { CitiesTable } from "./components/CitiesTable/CitiesTable";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { City, Forecast, Weather } from "./model/WeatherModel";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { ForecastAnalysis } from "./components/ForecastAnalysis/ForecastAnalysis";
import { fetchForecast, fetchWeather } from "./services/WeatherService";
import clouds from "./assets/clouds.mp4";

export const App = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);

  const scrollTo = useCallback((value: number) => {
    container.current?.scrollTo({ top: value, behavior: "smooth" });
  }, []);

  const addCity = useCallback(
    (city: City) => {
      if (!cities.find((item) => item.name === city.name)) {
        setCities([city, ...cities]);
      }
      scrollTo(window.innerHeight);
    },
    [cities, scrollTo]
  );

  const onCitySelect = useCallback(
    (city: City) => {
      setCity(city);
      scrollTo(window.innerHeight * 2);
    },
    [scrollTo]
  );

  useEffect(() => {
    (async function () {
      if (city) {
        const [weather, forecastData] = await Promise.all([
          fetchWeather(city.id),
          fetchForecast(city.id),
        ]);
        if (weather) {
          setWeather(weather);
        }
        if (forecastData) {
          console.log(forecastData);
          setForecast(forecastData);
        }
      }
    })();
  }, [city]);

  return (
    <div ref={container} className="container">
      <div className="weather page-scroll">
        <h1 className="weather__heading">Weather Forecast</h1>
        <CitySearch onSubmit={addCity} />
      </div>

      <div className="cities page-scroll">
        <CitiesTable
          cities={cities}
          current={city}
          onSelect={(city) => onCitySelect(city)}
        />
      </div>

      <div className="current-analysis page-scroll">
        <video className="current-video" loop autoPlay muted>
          <source src={clouds} type="video/mp4" />
        </video>
        <div className="current-weather">
          <CurrentWeather city={city} weather={weather} />
        </div>
      </div>

      <div className="forecast-weather page-scroll">
        <ForecastAnalysis forecast={forecast} city={city} />
      </div>
    </div>
  );
};
