import React from "react";
import News1 from "@assets/images/news1.png";
import News2 from "@assets/images/news2.png";
import News3 from "@assets/images/news3.png";
import News4 from "@assets/images/news4.png";
import News5 from "@assets/images/news5.png";
import { ImageTranslation } from "../../../components/ImageTranslation";
import { HomeTopicNewsSlider } from "./HomeTopicNewsSlider";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";

const data = [News1, News2, News3, News4, News5];

export const HomeTopicNews = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  return (
    <HomeTopicLayout
      title="home.home_topic._news"
      onNextClick={handleNext}
      onPreClick={handlePre}
      isPaddingTop
    >
      <div className="mt-[36px] xl:mt-[44px] flex flex-col-reverse md:flex-row gap-x-[24px] xl:gap-x-[24px]">
        <HomeTopicNewsImages />
        <div className="mt-[16px] md:mt-0 flex-1 mb-[16px] md:mb-0">
          <HomeTopicNewsSlider
            navigationNextRef={navigationNextRef}
            navigationPrevRef={navigationPrevRef}
          />
          {NavigationElement}
        </div>
      </div>
    </HomeTopicLayout>
  );
};

export const HomeTopicNewsImages = () => {
  return (
    <div className="flex flex-wrap max-w-[336px] md:max-w-[366px] lg:max-w-[424px] gap-[16px] xl:gap-[24px] h-[218px] xl:h-[274px]">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="h-[100px] xl:h-[125px] min-w-[100px] xl:min-w-[125px] max-w-[160px] xl:max-w-[200px] overflow-hidden"
          >
            <ImageTranslation link={item} />
          </div>
        );
      })}
    </div>
  );
};
