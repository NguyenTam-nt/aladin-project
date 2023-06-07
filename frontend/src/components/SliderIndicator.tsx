import React from "react";
import { SwiperComponent } from "./SwiperComponent";
import { SwiperSlide } from "swiper/react";

export const SliderIndicator = ({
  setThumbActive,
  dataLength = 0
}: {
  setThumbActive: any;
  dataLength: number;
}) => {
  return (
    <SwiperComponent
      slidesPerView={dataLength}
      initialSlide={1}
      freeMode={true}
      onSwiper={setThumbActive}
      watchSlidesProgress={true}
      className="h-[4px]  swiper-banner-home"
    >
      {Array.from({length: dataLength}).map((_: any, index) => {
        return (
          <SwiperSlide key={index} className="w-full h-[3px]">
            <div className="w-[48px] h-[4px] mr-[12px] bg-[#ccc] cursor-pointer"></div>
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};
