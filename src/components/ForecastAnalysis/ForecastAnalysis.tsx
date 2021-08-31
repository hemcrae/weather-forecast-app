import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ForecastAnalysis.scss";
import { City, Forecast } from "../../model/WeatherModel";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination, A11y]);
interface ForecastProps {
  city: City | null;
  forecast: Forecast | null;
  scrollTo: (value: number) => void;
}

export const ForecastAnalysis: React.FC<ForecastProps> = ({
  city,
  forecast,
  scrollTo,
}) => {
  if (!city || !forecast) {
    return null;
  }

  return (
    <>
      <div className="forecast">
        <button className="forecast__scroll-top">
          <KeyboardArrowUpIcon
            onClick={() => scrollTo(window.innerHeight)}
            fontSize="large"
          />
        </button>
        <div className="forecast__swiper">
          <h3 className="forecast__heading">Forecast</h3>
          <Swiper
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: "auto",
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            {forecast?.list.map((timePoint) => (
              <SwiperSlide key={`forecast-${timePoint.dt}`}>
                <WeatherEntry weather={timePoint} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
