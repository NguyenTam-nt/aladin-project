import { ImageTranslation } from "@components/ImageTranslation";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import clsx from "clsx";
import React, { memo } from "react";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { HomeTopicScientificResearchSlider } from "./HomeTopicScientificResearchSlider";

export const HomeTopicScientificResearch = () => {
    const {navigationNextRef, navigationPrevRef, handleNext, handlePre, NavigationElement} = useSwiperNavigationRef()
  return (
    <HomeTopicLayout onNextClick={handleNext} onPreClick={handlePre} title="home.home_topic._study">
      <div className="mt-[44px] grid grid-cols-[424px_1fr] gap-x-[24px]">
        <div className="p-[32px] h-auto max-h-[752px]  overflow-hidden text-text_white bg-secondary">
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
        </div>
        <div>
            <HomeTopicScientificResearchSlider navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />
            {NavigationElement}
           {/* <HomeTopicScientificResearchSliderItem /> */}
        </div>
      </div>
    </HomeTopicLayout>
  );
};

export const HomeTopicScientificResearchItem = () => {
  return (
    <div className="pb-2 border-b-[1px] border-solid border-text_white">
      <p className="text-_18 line-clamp-1 leading-[32px]">
        Rhoncus facilisis maecenas vestibulum{" "}
      </p>
      <p className="text-_14 line-clamp-1">25/12/2023</p>
    </div>
  );
};
