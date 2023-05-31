import React, { useEffect, useMemo, useState } from "react";
import { ImageTranslation } from "../../../components/ImageTranslation";
import { HomeTopicNewsSlider } from "./HomeTopicNewsSlider";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { paths } from "@constants/router";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import type { INews } from "@typeRules/news";
import { newsService } from "@services/newsService";
import { PAGE_SIZE } from "@constants/contain";

export const HomeTopicNews = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  const [newsList, setNewsList] = useState<INews[]>([])
  useEffect(() => {
    newsService.getNews({page: 0, size: PAGE_SIZE, sort: "id,desc"}).then((data) => {
      setNewsList(data.data)
    })
  }, [])

  const ImageNewList = useMemo(() => {
      return newsList.slice(0, newsList.length <= 5 ? newsList.length : 5 ).map((item) => {
        return {
          image: item.files?.[0]?.link || ""
        }
      })
  }, [newsList])

  return (
    <HomeTopicLayout
      title="home.home_topic._news"
      onNextClick={handleNext}
      onPreClick={handlePre}
      path={paths.news.prefix}
      isPaddingTop
    >
      <div className="mt-[36px] xl:mt-[44px] flex flex-col-reverse md:flex-row gap-x-[24px] xl:gap-x-[24px]">
        <HomeTopicNewsImages images={ImageNewList} />
        <div className="mt-[16px] md:mt-0 flex-1 mb-[16px] md:mb-0">
          <HomeTopicNewsSlider
            navigationNextRef={navigationNextRef}
            navigationPrevRef={navigationPrevRef}
            data={newsList}
          />
          {NavigationElement}
        </div>
      </div>
    </HomeTopicLayout>
  );
};

export const HomeTopicNewsImages = ({images}:{images:{image:string}[]}) => {
  const {ref, isInView} = useInView()
  return (
    <div ref={ref} className={clsx("flex flex-wrap max-w-[336px] overflow-hidden md:max-w-[366px] lg:max-w-[424px] gap-[16px] xl:gap-[24px] h-[218px] xl:h-[274px]", {"animate__animated animate__slideInLeft":isInView})}>
      {images.map((item, index) => {
        return (
          <div
            key={index}
            className="h-[100px] xl:h-[125px] min-w-[100px] xl:min-w-[125px] max-w-[160px] xl:max-w-[200px] overflow-hidden"
          >
            <ImageTranslation link={item?.image} />
          </div>
        );
      })}
    </div>
  );
};
