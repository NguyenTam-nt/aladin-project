import { SwiperComponent } from "@components/SwiperComponent";
import React, { useMemo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

export const Banner = () => {
  return (
    <div>
      <SwiperComponent slidesPerView={1}>
        <SwiperSlide>
         <BannerVideoItem />
        </SwiperSlide>
        <SwiperSlide>
         <BannerVideoItem />
        </SwiperSlide>
        <SwiperSlide>
         <BannerVideoItem />
        </SwiperSlide>
        <SwiperSlide>
         <BannerVideoItem />
        </SwiperSlide>
      </SwiperComponent>
    </div>
  );
};

const BannerVideoItem = () => {
    const refVideo = useRef<HTMLVideoElement>(null)
    
  return (
    <div className="w-full h-[350px]">
      <video ref={refVideo} autoPlay loop muted className="w-[100%] object-cover h-full">
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
      </video>
    </div>
  );
};
