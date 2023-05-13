import { TranslateContext } from "@contexts/Translation";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React, { useContext } from "react";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { HomeTopicNoticeSlider } from "./HomeTopicNoticeSlider";



export const HomeTopicNotice = () => {
  const { t } = useContext(TranslateContext);
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
    >
      <div className=" mt-[44px]">
       <HomeTopicNoticeSlider navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />
        {NavigationElement}
      </div>
    </HomeTopicLayout>
  );
};