import React, { useEffect, useState } from "react";
import { CityCoordinates, Weather } from "../../model/WeatherModel";
import { readWeather } from "../../services/WeatherService";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";

interface WeatherAnalysisProps {
  city: CityCoordinates | null;
}

export const WeatherAnalysis: React.FC<WeatherAnalysisProps> = ({ city }) => {
  const [weather, setWeather] = useState<Weather | undefined>();

  useEffect(() => {
    if (city) {
      readWeather(city.id).then((weather) => setWeather(weather));
    }
  }, [city]);

  if (!city || !weather) {
    return null;
  }

  return (
    <div className="analysis">
      <h2 className="analysis__name">{city.name}</h2>
      <WeatherEntry weather={weather} />
    </div>
  );
};
