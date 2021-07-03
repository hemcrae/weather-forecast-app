import React from "react";
import { useState } from "react";
import { CityCoordinates } from "../../model/WeatherModel";
import { getWeather } from "../../services/WeatherService";

interface CitySearchProps {
  onSubmit: (search: CityCoordinates) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onSubmit }) => {
  const [citySearch, setCitySearch] = useState("");

  let addCity = async (term: string) => {
    const city = await getWeather(term);

    if (!city) {
      alert(`${term} is not a valid city.`);
    } else {
      onSubmit(city);
    }
  };

  return (
    <div className="citySearch">
      <input
        className="weather__input"
        value={citySearch}
        onChange={(e) => setCitySearch(e.target.value)}
      />
      <button
        className="weather__button"
        onClick={() => addCity(citySearch)}
        disabled={!citySearch}
      >
        Search
      </button>
    </div>
  );
};
