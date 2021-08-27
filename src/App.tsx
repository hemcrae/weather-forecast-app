import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import { CitiesList } from "./components/CitiesTable/CitiesList";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { City, Forecast, Weather } from "./model/WeatherModel";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { ForecastAnalysis } from "./components/ForecastAnalysis/ForecastAnalysis";
import { fetchForecast, fetchWeather } from "./services/WeatherService";
import clouds from "./assets/clouds.mp4";
import sunny from "./assets/sunny.mp4";
import rain from "./assets/rain.mp4";
import snow from "./assets/snow.mp4";
import { useMemo } from "react";

export const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
        localStorage.setItem("cities", JSON.stringify([city, ...cities]));
      }
    },
    [cities]
  );

  const removeCity = useCallback(
    ({ id }: City) => {
      const filteredCities = cities.filter((value, index) => {
        if (id === value.id) {
          return false;
        }
        return true;
      });
      localStorage.setItem("cities", JSON.stringify(filteredCities));
      setCities(filteredCities);
    },
    [cities]
  );

  const onCitySelect = useCallback(
    (city: City) => {
      setCity(city);
      scrollTo(window.innerHeight);
    },
    [scrollTo]
  );

  const backgroundSrc = useMemo(() => {
    console.log(weather?.weather[0].main);
    switch (weather?.weather[0].main) {
      case "Clouds":
        return clouds;
      case "Clear":
        return sunny;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
    }
  }, [weather]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [backgroundSrc]);

  useEffect(() => {
    const localStorageCities = localStorage.getItem("cities");
    if (!localStorageCities) {
      return;
    }
    const citiesList = JSON.parse(localStorageCities);
    setCities(citiesList);
  }, []);

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
          setForecast(forecastData);
        }
      }
    })();
  }, [city]);

  return (
    <div ref={container} className="container">
      <div className="weather page-scroll">
        <div className="weather__wrap">
          <h1 className="weather__heading">Weather Forecast</h1>
          <CitySearch onSubmit={addCity} />
        </div>
        <CitiesList
          cities={cities}
          current={city}
          onSelect={(city) => onCitySelect(city)}
          removeCity={removeCity}
        />
      </div>

      <div className="current-analysis page-scroll">
        {backgroundSrc && (
          <video ref={videoRef} className="current-video" loop autoPlay muted>
            <source src={backgroundSrc} type="video/mp4" />
          </video>
        )}
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
