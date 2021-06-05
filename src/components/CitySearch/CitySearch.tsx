import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";

interface CitySearchProps {
  onSearch: (search: string) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [citySearch, setCitySearch] = useState("");

  const addCity = () => {
    onSearch(citySearch);
    setCitySearch("");
  };

  return (
    <div className="citySearch">
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
  );
};
