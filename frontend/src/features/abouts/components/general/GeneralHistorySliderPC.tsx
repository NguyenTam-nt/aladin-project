import { SwiperComponent } from "@components/SwiperComponent";
import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import bgImage from "@assets/images/bg_about.png";
import React from "react";
import { FreeMode } from "swiper";
import { SwiperSlide } from "swiper/react";
import { GeneralHistoryItem } from "./GeneralHistoryItem";

export const GeneralHistorySliderPC = () => {
  const { width } = useWindowResize();
  return (
    <div className="h-[700px] relative mt-[24px]">
      <div className="absolute inset-0 z-[-1]">
        <img src={bgImage} alt="" />
      </div>
      <div className="h-[4px] w-full bg-bg_9EA8B3 absolute top-[50%] translate-y-[-50%]" />
      <SwiperComponent
        slidesPerView={width >= withResponsive._1280 ? 3 : 2}
        style={{ height: 700 }}
        freeMode
        modules={[FreeMode]}
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
