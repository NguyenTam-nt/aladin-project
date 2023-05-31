import React, { memo } from "react";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { SwiperSlide } from "swiper/react";
import { SwiperComponent } from "@components/SwiperComponent";
import clsx from "clsx";
import useWindowResize from "@hooks/useWindowResize";
import { ImageTranslation } from "@components/ImageTranslation";
import { withResponsive } from "@constants/container";
import { Link } from "react-router-dom";
import { paths } from "@constants/router";
import type { INews } from "@typeRules/news";

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
  data: INews[]
};

export const HomeTopicScientificResearchSlider = ({
  navigationPrevRef,
  navigationNextRef,
  data
}: Props) => {
  const { width } = useWindowResize();
  return (
    <SwiperComponent
      navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      slidesPerView={width > withResponsive._1280 ? 2 : 1}
      spaceBetween={24}
      loop={false}
      style={{
        width:
          width >= 1536
            ? 1200 - 424
            : width > withResponsive._1024
            ? width * 0.9 - 424 - 24
            : width > withResponsive._768
            ? width - 424 - 24
            : width - 40,
      }}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <HomeTopicScientificResearchSliderItem
              data={item}
              isReversed={(index + 1) % 2 === 0}
            />
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};

type PropsHomeTopicScientificResearchSliderItem = {
  isReversed?: boolean;
  data: INews
};

export const HomeTopicScientificResearchSliderItem = memo(
  ({
    isReversed = false,
    data,
  }: PropsHomeTopicScientificResearchSliderItem) => {
    return (
      <Link
        to={`${paths.news.prefix}/${paths.news.detail}?id=${data.id}`}
        className={clsx("flex flex-col", { "flex-col-reverse": isReversed })}
      >
        <div
          className={clsx("h-[274px] w-full overflow-hidden", {
            "mt-[24px]": isReversed,
            "mb-[24px]": !isReversed,
          })}
        >
          <ImageTranslation link={data?.files?.[0]?.link + ""} />
        </div>
        <HomeTopicNewsItem data={data} />
      </Link>
    );
  }
);
