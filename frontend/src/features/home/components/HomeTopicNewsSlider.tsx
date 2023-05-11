import React from "react";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
import { width } from "@constants/container";

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
};

export const HomeTopicNewsSlider = ({
  navigationPrevRef,
  navigationNextRef,
}: Props) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={24}
      loop={false}
      // loopFillGroupWithBlank={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      navigation={{
        // Both prevEl & nextEl are null at render so this does not work
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onSwiper={(swiper: any) => {
        // Delay execution for the refs to be defined
        setTimeout(() => {
          // Override prevEl & nextEl now that refs are defined
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;

          // Re-init navigation
          swiper.navigation.destroy();
          swiper.navigation.init();
          swiper.navigation.update();
        });
      }}
      modules={[Navigation]}
      style={{
        width: width >= 1536 ? 1200 - 424 : width * 0.9 - 424 - 24,
      }}
    >
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
    </Swiper>
  );
};
