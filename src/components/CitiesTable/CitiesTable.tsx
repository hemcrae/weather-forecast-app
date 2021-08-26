import React from "react";
import { City } from "../../model/WeatherModel";
import "./CitiesTable.scss";
import "../../utils/scroll.utils";

interface CitiesTableProps {
  cities: City[];
  current: City | null;
  onSelect: (city: City) => void;
}

export const CitiesTable: React.FC<CitiesTableProps> = ({
  cities,
  current,
  onSelect,
}) => {
  return (
    <div className="cities">
      {cities.map((city, index) => (
        <ol className={current?.id === city.id ? "table__row" : ""} key={index}>
          <li className="table__body-data" onClick={() => onSelect(city)}>
            {city.name}
          </li>
        </ol>
      ))}
    </div>
  );
};
