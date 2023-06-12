import { SwiperComponent } from "@components/SwiperComponent";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { TopicPostItem } from "./TopicPostItem";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { ICArowLeft } from "@assets/icons/ICArrowLeft";
import { ICArowRight } from "@assets/icons";
import { Colors } from "@constants/color";
import { ICArrowRightNext } from "@assets/icons/ICArrowRightNext";
import { windownSizeWidth, withResponsive } from "@constants/index";

export const TopicPost = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    NavigationElement,
    handleNext,
    handlePre,
    currentIndex,
    onActiveIndexChange,
  } = useSwiperNavigationRef();
  return (
    <div className="w-rp relative mb-[70px] lg:mb-0">
      <SwiperComponent
        onActiveIndexChange={onActiveIndexChange}
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
        spaceBetween={windownSizeWidth > withResponsive._1024 ? 0 : 16}
      >
        {[1, 2, 3].map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <TopicPostItem />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>
      {NavigationElement}
      <div className=" absolute flex gap-x-[34px] ml-[20px] lg:ml-[13px] left-0 bottom-[-40px] lg:left-[50%] z-[1] lg:bottom-0">
        <button onClick={handlePre}>
          <ICArowLeft
            width={windownSizeWidth > withResponsive._1024 ? 36 : 24}
            height={windownSizeWidth > withResponsive._1024 ? 24 : 15}
            color={currentIndex > 0 ? Colors.primary : Colors.text_5A5C60}
          />
        </button>

        <button onClick={handleNext}>
          <ICArrowRightNext
            width={windownSizeWidth > withResponsive._1024 ? 36 : 24}
            height={windownSizeWidth > withResponsive._1024 ? 24 : 15}
            color={currentIndex < 2 ? Colors.primary : Colors.text_5A5C60}
          />
        </button>
      </div>
    </div>
  );
};
