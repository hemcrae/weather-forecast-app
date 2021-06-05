import { Button, TextField } from "@material-ui/core";
import react, { useState } from "react";
import "./App.scss";
import { CitiesTable } from "./components/CitiesTable/CitiesTable";
import { CitySearch } from "./components/CitySearch/CitySearch";

export const App = () => {
  const [cities, setCities] = useState<string[]>([]);
  const addCity = (city: string) => {
    setCities([city, ...cities]);
  };
  return (
    <div className="container container__top">
      <div className="weather">
        <h1 className="weather__heading">Weather Forecast App</h1>
        <div className="weather__inputs">
          <h3 className="weather__label">Add City</h3>
          <CitySearch onSearch={addCity} />
        </div>
      </div>

      <div className="container container__bottom">
        <CitiesTable cities={cities} />
      </div>
    </div>
  );
};
