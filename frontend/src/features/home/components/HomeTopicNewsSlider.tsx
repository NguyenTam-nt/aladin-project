import React from "react";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import {  SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
import { withResponsive } from "@constants/container";
import { SwiperComponent } from "@components/SwiperComponent";
import useWindowResize from "@hooks/useWindowResize";

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
};

export const HomeTopicNewsSlider = ({
  navigationPrevRef,
  navigationNextRef,
}: Props) => {
  const {width} = useWindowResize()
  return (
    <SwiperComponent
     navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      slidesPerView={width > withResponsive._1280 ? 2 : 1}
      spaceBetween={24}
      loop={false}
      // loopFillGroupWithBlank={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      modules={[Navigation]}
      style={{
        width: width >= withResponsive._1536 ? 1200 - 424 - (24 * 2) : width >= withResponsive._1024 ? width * 0.9 - 424 - 24 : (width >= withResponsive._768 ?  width - 366 - 16 - (20*2)  : width - (20 * 2)),
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
