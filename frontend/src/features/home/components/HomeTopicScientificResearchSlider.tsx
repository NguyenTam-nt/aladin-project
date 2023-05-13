import React, { memo } from "react";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
import { width } from "@constants/container";
import { SwiperComponent } from "@components/SwiperComponent";
import { ImageTranslation } from "@components/ImageTranslation";
import clsx from "clsx";

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
};

export const HomeTopicScientificResearchSlider = ({
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
      style={{
        width: width >= 1536 ? 1200 - 424 : width * 0.9 - 424 - 24,
      }}
    >
      {/* <> */}
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicScientificResearchSliderItem />
      </SwiperSlide>
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicScientificResearchSliderItem isReversed />
      </SwiperSlide>
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicScientificResearchSliderItem />
      </SwiperSlide>
      <SwiperSlide
      // key={item.id}
      >
        <HomeTopicScientificResearchSliderItem isReversed />
      </SwiperSlide>
      {/* </> */}
    </SwiperComponent>
  );
};


type PropsHomeTopicScientificResearchSliderItem = {
    isReversed?: boolean
}


export const HomeTopicScientificResearchSliderItem = memo(({isReversed = false}:PropsHomeTopicScientificResearchSliderItem) => {
    return (
        <div className={clsx("flex flex-col", {"flex-col-reverse": isReversed})}>
        <div className={clsx("h-[274px] w-full overflow-hidden", {"mt-[24px]": isReversed, "mb-[24px]": !isReversed})}>
            <img className="w-full h-full" alt="" src="https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/29faa76315d5ebbe2c41509ef77d3293_70303_9.jpg" />
        </div>
        <HomeTopicNewsItem />
    </div>
    )
})