import React, { useEffect, useState } from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicNewsItem } from "./TopicNewsItem";
import { paths } from "@constants/routerPublic";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import { newService } from "@services/newService";
import type { newItem_type } from "@typeRules/new";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import Image2 from "@assets/images/home/bgnews/bg_news_2.webp"

export const TopicNews = () => {
  const [news, setNews] = useState<newItem_type[]>([]);

  useEffect(() => {
    newService.getNews({ page: 0, size: 4, sort: "id,desc" }).then((data) => {
      setNews(data?.list);
    });
  }, []);
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div className=" relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <div className="absolute right-0 top-[50px] select-none  pointer-events-none">
          <img  src={Image2} alt="" />
        </div>
      ) : null}

      <div className="w-rp relative">
        <TitleWithSeeAll
          title="home.news.title"
          pathNavigate={paths.news.prefix}
        />
        <div className="mt-[48px]" ref={ref}>
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
                  className={clsx("w-[70%] _420:w-full", {
                    "animate__animated animate__fadeInUp": isInView,
                  })}
                  key={item.id}
                  style={{
                    ["--animate-count" as string]: index,
                  }}
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
