import React from "react";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { SwiperSlide } from "swiper/react";

import { Grid, Navigation, Pagination } from "swiper";
import { withResponsive } from "@constants/container";
import { SwiperComponent } from "@components/SwiperComponent";
import useWindowResize from "@hooks/useWindowResize";
import type { INews } from "@typeRules/news";

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
  data: INews[]
};

export const HomeTopicNewsSlider = ({
  navigationPrevRef,
  navigationNextRef,
  data
}: Props) => {
  const { width } = useWindowResize();
  return (
    <SwiperComponent
      navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      slidesPerView={width > withResponsive._1280 ? 2 : 1}
      spaceBetween={24}
      // grid={{
      //   rows: width > withResponsive._1280 ? 1 : 2,
      // }}
      loop={false}
      // loopFillGroupWithBlank={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      modules={[Grid, Navigation, Pagination]}
      style={{
        width:
          width >= withResponsive._1536
            ? 1200 - 424 - 24
            : width >= withResponsive._1024
            ? width * 0.9 - 424 - 24
            : width >= withResponsive._768
            ? width - 366 - 16 - 20 * 2
            : width - 20 * 2,
      }}
    >
      {/* <> */}
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <HomeTopicNewsItem
              index={index}
              data={item}
              isChangeColor={(index + 1) % 2 === 0}
            />
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};
