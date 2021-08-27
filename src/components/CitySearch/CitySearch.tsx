import React, { FormEvent, useCallback } from "react";
import { useState } from "react";
import { City } from "../../model/WeatherModel";
import { getWeather } from "../../services/WeatherService";
import "./CitySearch.scss";
import SearchIcon from "@material-ui/icons/Search";

interface CitySearchProps {
  onSubmit: (search: City) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onSubmit }) => {
  const [citySearch, setCitySearch] = useState("");

  let addCity = useCallback(
    async (e: FormEvent<HTMLFormElement>, term: string) => {
      e.preventDefault();
      const city = await getWeather(term);

      if (!city) {
        alert(`${term} is not a valid city.`);
      } else {
        onSubmit(city);
        setCitySearch("");
      }
    },
    [onSubmit]
  );

  return (
    <form className="search" onSubmit={(e) => addCity(e, citySearch)}>
      <input
        className="search__input"
        value={citySearch}
        onChange={(e) => setCitySearch(e.target.value)}
        placeholder="Search for city"
        type="text"
      />
      <button className="search__button" disabled={!citySearch} type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};
