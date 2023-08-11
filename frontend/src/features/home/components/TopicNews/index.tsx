import React, { useEffect, useState } from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicNewsItem } from "./TopicNewsItem";
import { paths } from "@constants/routerPublic";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import { newService } from "@services/newService";
import type { newItem_type } from "@typeRules/new";
import clsx from "clsx";
import Image2 from "@assets/images/home/bgnews/bg_news_2.webp"

export const TopicNews = () => {
  const [news, setNews] = useState<newItem_type[]>([]);

  useEffect(() => {
    newService.home().then((data) => {
      setNews(data?.list ?? []);
    });
  }, []);

  return (
    <div className=" relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <div className="absolute right-0 top-[50px] select-none  pointer-events-none">
          <img className="w-full h-full"   src={Image2} alt="" />
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
            {news.map((item, index) => {
              return (
                <SwiperSlide
                  className={clsx("w-[70%] _420:w-full")}
                  key={item.id}
                >
                  <TopicNewsItem data={item} />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
        </div>
      </div>
    </div>
  );
};
