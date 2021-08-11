import react, { useCallback, useRef, useState } from "react";
import "./App.scss";
import { CitiesTable } from "./components/CitiesTable/CitiesTable";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { City } from "./model/WeatherModel";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { ForecastAnalysis } from "./components/ForecastAnalysis/ForecastAnalysis";

export const App = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

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
      setCurrentCity(city);
      scrollTo(window.innerHeight * 2);
    },
    [scrollTo]
  );

  return (
    <div ref={container} className="container">
      <div className="weather page-scroll">
        <h1 className="weather__heading">Weather Forecast</h1>
        <CitySearch onSubmit={addCity} />
      </div>

      <div className="cities page-scroll">
        <CitiesTable
          cities={cities}
          current={currentCity}
          onSelect={(city) => onCitySelect(city)}
        />
      </div>

      <div className="analysis page-scroll">
        <CurrentWeather city={currentCity} />
        <ForecastAnalysis city={currentCity} />
      </div>
    </div>
  );
};
