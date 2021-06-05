import React from "react";

interface CitiesTableProps {
  cities: string[];
}

export const CitiesTable: React.FC<CitiesTableProps> = ({ cities }) => {
  return (
    <div className="cities__table">
      <table className="table">
        <thead className="table__head">
          <tr className="table__heading-row">
            <th className="table__heading">Cities</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {cities.map((city, index) => {
            <tr key={index} className="table__body-row">
              <td className="table__body-data">{city}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};
