import react, { useState } from "react";
import "./App.css";

export const App = () => {
  const [citySearch, setCitySearch] = useState("Montreal");
  const [cities, setCities] = useState([
    "Ottawa",
    "St.John's",
    "Halifax",
    "Fredricton",
    "Charlottetown",
    "Quebec City",
    "Toronto",
    "Winnipeg",
    "Regina",
    "Edmonton",
    "Victoria",
    "Iqaluit",
    "Yellowknife",
    "Whitehorse",
  ]);

  return (
    <div className="container">
      <div className="weather__wrap">
        <h1 className="heading">Weather Forecast App</h1>
        <div className="weather__inputs">
          <label className="weather__label">Location</label>
          <input
            className="weather__input"
            type="text"
            value={citySearch}
            onChange={(event) => setCitySearch(event.target.value)}
          />
          <button
            className="weather__button"
            onClick={() => setCities([citySearch, ...cities])}
          >
            Search
          </button>
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
