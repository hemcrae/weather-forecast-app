import { Button, TextField } from "@material-ui/core";
import react, { useState } from "react";
import "./App.scss";

export const App = () => {
  const [citySearch, setCitySearch] = useState("");
  const [cities, setCities] = useState<String[]>([]);
  const addCity = () => {
    setCities([citySearch, ...cities]);
    setCitySearch("");
  };

  return (
    <div className="container">
      <div className="weather">
        <h1 className="weather__heading">Weather Forecast App</h1>
        <div className="weather__inputs">
          <h3 className="weather__label">Choose City</h3>
          <TextField
            className="weather__input"
            label="City"
            value={citySearch}
            onChange={(event) => setCitySearch(event.target.value)}
          />
          <Button className="weather__button" onClick={addCity}>
            Search
          </Button>
        </div>
      </div>

      <div className="locations">
        <div className="locations__heading">Locations</div>
        <div className="locations__table">
          <table className="table">
            <thead className="table__head">
              <tr className="table__heading-row">
                <th className="table__heading">City</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {cities.map((city, index) => (
                <tr key={index} className="table__body-row">
                  <td className="table__body-data">{city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
