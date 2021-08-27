import React from "react";
import { City } from "../../model/WeatherModel";
import "./CitiesTable.scss";
import "../../utils/scroll.utils";
import CloseIcon from "@material-ui/icons/Close";

interface CitiesTableProps {
  cities: City[];
  current: City | null;
  onSelect: (city: City) => void;
  removeCity: (city: City) => void;
}

export const CitiesTable: React.FC<CitiesTableProps> = ({
  cities,
  current,
  onSelect,
  removeCity,
}) => {
  return (
    <div className="cities">
      <ol>
        {cities.map((city, index) => (
          <li
            className="table__body-data"
            onClick={() => onSelect(city)}
            key={index}
          >
            {city.name}
            <button className="table__button">
              <CloseIcon onClick={() => removeCity(city)} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
