import React from "react";
import { Weather } from "../../model/WeatherModel";
import { getIconUrl } from "../../services/WeatherService";

interface WeatherEntryProps {
  weather: Weather;
}
