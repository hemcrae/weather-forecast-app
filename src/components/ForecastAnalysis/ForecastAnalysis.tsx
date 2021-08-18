import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ForecastAnalysis.scss";
import { City, Forecast } from "../../model/WeatherModel";
import { WeatherEntry } from "../WeatherEntry/WeatherEntry";
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
interface ForecastProps {
  city: City | null;
  forecast: Forecast | null;
}

export const ForecastAnalysis: React.FC<ForecastProps> = ({
  city,
  forecast,
}) => {
  if (!city || !forecast) {
    return null;
  }

  return (
    <>
      <div className="forecast">
        <h3 className="forecast__heading">Forecast</h3>
        <div className="forecast__swiper">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
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
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
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
