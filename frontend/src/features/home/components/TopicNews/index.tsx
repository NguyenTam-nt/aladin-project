import React from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicNewsItem } from "./TopicNewsItem";
import { paths } from "@constants/routerPublic";
import { ICHomeTopicNewsRight } from "@assets/icons/ICHomeTopicNewsRight";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";

export const TopicNews = () => {
  return (
    <div className=" relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <div className="absolute right-0 top-[50px]">
          <ICHomeTopicNewsRight />
        </div>
      ) : null}

      <div className="w-rp relative">
        <TitleWithSeeAll
          title="home.news.title"
          pathNavigate={paths.news.prefix}
        />
        <div className="mt-[48px]">
          <SwiperComponent
            spaceBetween={windownSizeWidth > withResponsive._1024 ? 24 : 16}
            slidesPerView={
              windownSizeWidth > withResponsive._1024
                ? 4
                : windownSizeWidth > withResponsive._420
                ? 2
                : "auto"
            }
          >
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <SwiperSlide className="w-[70%] _420:w-full" key={index}>
                  <TopicNewsItem />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
        </div>
      </div>
    </div>
  );
};
