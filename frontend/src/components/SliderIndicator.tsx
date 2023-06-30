import React from "react";
import { SwiperComponent } from "./SwiperComponent";
import { SwiperSlide } from "swiper/react";
import clsx from "clsx";

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
      // initialSlide={1}
      freeMode={true}
      // spaceBetween={14}
      onSwiper={setThumbActive}
      watchSlidesProgress={true}
      className="h-[4px]  swiper-banner-home"
    >
      {Array.from({length: dataLength}).map((_: any, index) => {
        return (
          <SwiperSlide key={index} className="w-full h-[4px]">
            <div className={clsx("w-[24px] mr-[14px] lg:w-[48px] h-[4px] bg-bg_255_255_255_064 cursor-pointer",
              {"w-[16px] !mr-2": dataLength >= 6}
            )} />
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};
