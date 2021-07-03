import React from "react";
import axios from "axios";
import { CityCoordinates, Weather } from "../model/WeatherModel";

const key: string = process.env.REACT_APP_API_KEY_OW as string;

if (key === undefined) {
  throw new Error("No weather API Key defined");
}

const keyQuery = `appid=${key}`;
const APIUrl = "http://api.openweathermap.org/data/2.5";

export async function getWeather(
  item: string
): Promise<CityCoordinates | undefined> {
  try {
    const { data } = await axios.get<CityCoordinates>(
      `${APIUrl}/weather?q=${item}&${keyQuery}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function readWeather(
  cityId: number
): Promise<Weather | undefined> {
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
