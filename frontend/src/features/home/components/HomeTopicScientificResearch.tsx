import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React  from "react";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { HomeTopicScientificResearchSlider } from "./HomeTopicScientificResearchSlider";

export const HomeTopicScientificResearch = () => {
    const {navigationNextRef, navigationPrevRef, handleNext, handlePre, NavigationElement} = useSwiperNavigationRef()
  return (
    <HomeTopicLayout onNextClick={handleNext} onPreClick={handlePre} title="home.home_topic._study">
      <div className="mt-[44px] flex flex-col-reverse md:flex-row gap-x-[24px]">
        <div className="p-[32px] md:w-[424px] h-auto max-h-[752px]  overflow-hidden text-text_white bg-secondary">
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
          <HomeTopicScientificResearchItem />
        </div>
        <div className="flex-1 mb-[16px] md:mb-0">
            <HomeTopicScientificResearchSlider navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />
            {NavigationElement}
        </div>
      </div>
    </HomeTopicLayout>
  );
};

export const HomeTopicScientificResearchItem = () => {
  return (
    <div className="pb-2 border-b-[1px] border-solid border-text_white">
      <p className="text-_16 xl:text-_18 line-clamp-1 leading-[32px]">
        Rhoncus facilisis maecenas vestibulum{" "}
      </p>
      <p className="text-_14 line-clamp-1">25/12/2023</p>
    </div>
  );
};
