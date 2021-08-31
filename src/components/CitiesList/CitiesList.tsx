import React from "react";
import { City } from "../../model/WeatherModel";
import "./CitiesList.scss";
import "../../utils/scroll.utils";

interface CitiesListProps {
  cities: City[];
  current: City | null;
  onSelect: (city: City) => void;
  removeCity: (city: City) => void;
}

export const CitiesList: React.FC<CitiesListProps> = ({
  cities,
  current,
  onSelect,
  removeCity,
}) => {
  return (
    <div className="cities">
      <ol className="cities__list">
        {cities.map((city, index) => (
          <>
            <li
              className="cities__list-item"
              onClick={() => onSelect(city)}
              key={index}
            >
              {city.name}
            </li>
            <button
              className="cities__list-button"
              onClick={() => removeCity(city)}
            >
              x
            </button>
          </>
        ))}
      </ol>
    </div>
  );
};
