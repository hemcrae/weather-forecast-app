import react, { useState } from "react";
import "./App.scss";
import { CitiesTable } from "./components/CitiesTable/CitiesTable";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { City } from "./model/WeatherModel";
import { WeatherAnalysis } from "./components/WeatherAnalysis/WeatherAnalysis";

export const App = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  const addCity = (city: City) => {
    if (!cities.find((item) => item.name === city.name)) {
      setCities([city, ...cities]);
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <h1 className="weather__heading">Weather Forecast App</h1>
        <div className="weather__inputs">
          <h3 className="weather__label">Add City</h3>
          <CitySearch onSubmit={addCity} />
        </div>
      </div>

      <div className="container">
        <CitiesTable
          cities={cities}
          current={currentCity}
          onSelect={(city) => setCurrentCity(city)}
        />
      </div>

      <div className="container">
        <WeatherAnalysis city={currentCity} />
      </div>
    </div>
  );
};
