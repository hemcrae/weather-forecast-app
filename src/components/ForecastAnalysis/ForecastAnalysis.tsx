import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ForecastAnalysis.scss";
import { City, Forecast } from "../../model/WeatherModel";
import { fetchForecast } from "../../services/WeatherService";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";
import "swiper/swiper.scss";

interface ForecastProps {
  city: City | null;
}

export const ForecastAnalysis: React.FC<ForecastProps> = ({ city }) => {
  const [forecast, setForecast] = useState<Forecast | undefined>();

  useEffect(() => {
    (async function () {
      if (city) {
        const [forecast] = await Promise.all([fetchForecast(city.id)]);
        if (forecast) {
          console.log(forecast);
          setForecast(forecast);
        }
      }
    })();
  }, [city]);

  if (!city || !forecast) {
    return null;
  }

  return (
    <>
      <div className="forecast">
        <h3 className="forecast__heading">Forecast</h3>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {forecast?.list.map((timePoint) => (
            <SwiperSlide
              className="forecast__list-item"
              key={`forecast-${timePoint.dt}`}
            >
              <WeatherEntry weather={timePoint} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
