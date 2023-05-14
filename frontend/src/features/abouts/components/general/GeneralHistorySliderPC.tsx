import { SwiperComponent } from "@components/SwiperComponent";
import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { GeneralHistoryItem } from "./GeneralHistoryItem";

export const GeneralHistorySliderPC = () => {
  const { width } = useWindowResize();
  return (
    <div className="h-[700px] relative mt-[24px]">
      <div className="h-[4px] w-full bg-bg_9EA8B3 absolute top-[50%] translate-y-[-50%]" />
      <SwiperComponent
        slidesPerView={width >= withResponsive._1280 ? 3 : 2}
        style={{ height: 700 }}
      >
        <SwiperSlide>
          <GeneralHistoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <GeneralHistoryItem isReverse />
        </SwiperSlide>
        <SwiperSlide>
          <GeneralHistoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <GeneralHistoryItem isReverse />
        </SwiperSlide>
      </SwiperComponent>
    </div>
  );
};
