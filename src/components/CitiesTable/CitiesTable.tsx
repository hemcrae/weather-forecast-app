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
      <h2 className="table__heading">Cities</h2>
      {cities.map((city, index) => (
        <div
          className={current?.id === city.id ? "table__row" : ""}
          key={index}
        >
          <h3 className="table__body-data" onClick={() => onSelect(city)}>
            {city.name}
          </h3>
        </div>
      ))}
    </div>
  );
};
