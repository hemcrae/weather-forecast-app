import react, { useState } from "react";
import "./App.scss";
import { CitiesTable } from "./components/CitiesTable/CitiesTable";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { CityCoordinates } from "./model/WeatherModel";

export const App = () => {
  const [cities, setCities] = useState<CityCoordinates[]>([]);
  const [currentCity, setCurrentCity] = useState<CityCoordinates | null>(null);

  const addCity = (city: CityCoordinates) => {
    if (!cities.find((item) => item.name === city.name)) {
      setCities([city, ...cities]);
    }
  };

  return (
    <div className="container container__top">
      <div className="weather">
        <h1 className="weather__heading">Weather Forecast App</h1>
        <div className="weather__inputs">
          <h3 className="weather__label">Add City</h3>
          <CitySearch onSubmit={addCity} />
        </div>
      </div>

      <div className="container container__bottom">
        <CitiesTable
          cities={cities}
          current={currentCity}
          onSelect={(city) => setCurrentCity(city)}
        />
      </div>
    </div>
  );
};
