import { paths } from "@constants/router";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React from "react";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { HomeTopicNoticeSlider } from "./HomeTopicNoticeSlider";



export const HomeTopicNotice = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  return (
    <HomeTopicLayout
      title="home.home_topic._notice"
      isPaddingTop
      onNextClick={handleNext}
      onPreClick={handlePre}
      path={paths.notice.prefix}
    >
      <div className="mt-[36px] xl:mt-[44px]">
       <HomeTopicNoticeSlider navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />
        {NavigationElement}
      </div>
    </HomeTopicLayout>
  );
};