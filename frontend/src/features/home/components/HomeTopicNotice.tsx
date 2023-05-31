import React from "react";
import { paths } from "@constants/router";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { HomeTopicNoticeSlider } from "./HomeTopicNoticeSlider";
import { NoticeId } from "@constants/contain";
import { useGetNews } from "../hooks/useGetNews";

export const HomeTopicNotice = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  const {news} = useGetNews(`${NoticeId}`)
  return news.length ? (
    <HomeTopicLayout
      title="home.home_topic._notice"
      isPaddingTop
      onNextClick={handleNext}
      onPreClick={handlePre}
      path={`${paths.news.prefix}?type=${NoticeId}`}
    >
      <div className="mt-[36px] xl:mt-[44px]">
        <HomeTopicNoticeSlider
           notices={news}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
        />
        {NavigationElement}
      </div>
    </HomeTopicLayout>
  ) : null;
};
