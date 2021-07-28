import React from "react";
import axios from "axios";
import { City, Forecast, Weather } from "../model/WeatherModel";

const key: string = process.env.REACT_APP_API_KEY_OW as string;

if (key === undefined) {
  throw new Error("No weather API Key defined");
}

const keyQuery = `appid=${key}&units=metric`;
const APIUrl = "http://api.openweathermap.org/data/2.5";

export async function getWeather(item: string) {
  try {
    const { data } = await axios.get<City>(
      `${APIUrl}/weather?q=${item}&${keyQuery}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchWeather(cityId: number) {
  try {
    const { data } = await axios.get<Weather>(
      `${APIUrl}/weather?id=${cityId}&${keyQuery}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}

export async function fetchForecast(cityId: number) {
  try {
    const { data } = await axios.get<Forecast>(
      `${APIUrl}/forecast?id=${cityId}&${keyQuery}&units=metric&cnt=8`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
