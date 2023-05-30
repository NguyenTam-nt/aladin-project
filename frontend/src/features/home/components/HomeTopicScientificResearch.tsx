import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { HomeTopicScientificResearchSlider } from "./HomeTopicScientificResearchSlider";
import { useGetNews } from "../hooks/useGetNews";
import { StudyNewsId } from "@constants/contain";
import type { INews } from "@typeRules/news";
import { getDate } from "@commons/index";

export const HomeTopicScientificResearch = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  const { news } = useGetNews(StudyNewsId + "");
  return news.length ? (
    <HomeTopicLayout
      onNextClick={handleNext}
      onPreClick={handlePre}
      title="home.home_topic._study"
      path={`${paths.news.prefix}/${paths.news.study}`}
    >
      <div className="mt-[44px] flex flex-col-reverse md:flex-row gap-x-[24px]">
        <div className="p-[32px] md:w-[424px] h-auto max-h-[752px]  overflow-hidden text-text_white bg-secondary">
          {news.map((item, index) => {
            return <HomeTopicScientificResearchItem key={index} data={item} />;
          })}
        </div>
        <div className="flex-1 mb-[16px] md:mb-0">
          <HomeTopicScientificResearchSlider
            data={news}
            navigationNextRef={navigationNextRef}
            navigationPrevRef={navigationPrevRef}
          />
          {NavigationElement}
        </div>
      </div>
    </HomeTopicLayout>
  ) : <div className="py-[20px]" />;
};

type PropsItem = {
  data: INews;
};

export const HomeTopicScientificResearchItem = ({ data }: PropsItem) => {
  const { isVn } = useContext(TranslateContext);
  return (
    <Link
      to={`${paths.news.prefix}/${paths.news.detail}?slug=trao-thuong`}
      className="pb-2 block border-b-[1px] border-solid border-text_white"
    >
      <p className="text-_16 xl:text-_18 line-clamp-1 leading-[32px]">
        {isVn ? data?.title : data?.titleKo}
      </p>
      <p className="text-_14 line-clamp-1">{getDate(data.createdDate + "")}</p>
    </Link>
  );
};
