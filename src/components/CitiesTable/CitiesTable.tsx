import React from "react";
import { CityCoordinates } from "../../model/WeatherModel";

interface CitiesTableProps {
  cities: CityCoordinates[];
  current: CityCoordinates | null;
  onSelect: (city: CityCoordinates) => void;
}

export const CitiesTable: React.FC<CitiesTableProps> = ({
  cities,
  current,
  onSelect,
}) => {
  return (
    <div className="cities__table">
      <table className="table">
        <thead className="table__head">
          <tr className="table__heading-row">
            <th className="table__heading">Cities</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {cities.map((city, index) => (
            <tr
              className={current?.id === city.id ? "table__row" : ""}
              onClick={() => onSelect(city)}
              key={index}
            >
              <td className="table__body-data">{city.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
