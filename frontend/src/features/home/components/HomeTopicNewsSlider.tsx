import React from "react";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
import { width } from "@constants/container";
import { SwiperComponent } from "@components/SwiperComponent";

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
};

export const HomeTopicNewsSlider = ({
  navigationPrevRef,
  navigationNextRef,
}: Props) => {
  return (
    <SwiperComponent
     navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      slidesPerView={2}
      spaceBetween={24}
      loop={false}
      // loopFillGroupWithBlank={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      modules={[Navigation]}
      style={{
        width: width >= 1536 ? 1200 - 424 : width * 0.9 - 424 - 24,
      }}
    >
      {/* <> */}
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicNewsItem />
      </SwiperSlide>
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicNewsItem isChangeColor />
      </SwiperSlide>
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicNewsItem />
      </SwiperSlide>
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicNewsItem />
      </SwiperSlide>
      {/* </> */}
    </SwiperComponent>
  );
};
