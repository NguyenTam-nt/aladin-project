import { SwiperComponent } from "@components/SwiperComponent";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { TopicPostItem } from "./TopicPostItem";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { ICArowLeft } from "@assets/icons/ICArrowLeft";
import { ICArowRight } from "@assets/icons";
import { Colors } from "@constants/color";
import { ICArrowRightNext } from "@assets/icons/ICArrowRightNext";

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
    <div className="w-rp relative">
      <SwiperComponent
        onActiveIndexChange={onActiveIndexChange}
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
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
      <div className=" absolute flex gap-x-[34px] ml-[13px] left-[50%] z-[1] bottom-0">
        <button onClick={handlePre}>
          <ICArowLeft
            color={currentIndex > 0 ? Colors.primary : Colors.text_5A5C60}
          />
        </button>

        <button onClick={handleNext}>
          <ICArrowRightNext
            color={currentIndex < 2 ? Colors.primary : Colors.text_5A5C60}
          />
        </button>
      </div>
    </div>
  );
};
