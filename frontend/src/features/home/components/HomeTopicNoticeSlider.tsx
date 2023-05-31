import { SwiperComponent } from "@components/SwiperComponent";
import {  withResponsive } from "@constants/container";
import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useInView from "@hooks/useInView";
import useWindowResize from "@hooks/useWindowResize";
import type { INews } from "@typeRules/news";
import clsx from "clsx";
import React, { memo, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { SwiperSlide } from "swiper/react";

type Props = {
  navigationNextRef: React.RefObject<HTMLDivElement>;
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  notices: INews[]
};

export const HomeTopicNoticeSlider = ({
  navigationNextRef,
  navigationPrevRef,
  notices
}: Props) => {

  const {width} = useWindowResize()

  const noticeCountItems = useMemo(() => {
    return Array.from({ length: Math.ceil(notices.length / 6) }, (_, i) => i);
  }, [notices.length]);

  return (
    <SwiperComponent
      slidesPerView={ width > withResponsive._768 ? 2 : 1}
      spaceBetween={24}
      navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      loop={false}
      modules={[Navigation]}
    >
      {noticeCountItems.map((_, _index) => {
        return (
          <SwiperSlide key={_index}>
            {notices.slice(_index * 6, 6*(_index+1)).map((item, index) => {
              return <HomeNoticeSliderItem isDisable={_index > 1} isEven={(_index+1)%2 === 0} index={index} data={item} key={index} />;
            })}
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};

type PropsSwiper = {
    data: INews
    index?: number
    isEven?: boolean
    isDisable?: boolean
}


const HomeNoticeSliderItem = memo(({data, index, isEven, isDisable}:PropsSwiper) => {
  const { t, isVn } = useContext(TranslateContext);
  const {ref, isInView} = useInView()
  return (
    <Link to={`${paths.notice.prefix}/${paths.notice.detail}?id=1`}>
      <div 
      ref={ref} 
      className={clsx("pb-[8px] border-b-[1px] border-solid border-br_E9ECEF animate__animated",
      {"animate__fadeInLeft": !isEven && isInView && !isDisable, "animate__fadeInRight": isEven && isInView && !isDisable})}
        style={{
          ['--animate-count' as string]: index
        }}
      >
        <p className=" leading-[32px] line-clamp-1 text-_16 m992:text-_18 font-semibold text-text_primary">
        {isVn ? data.title : data.titleKo}
        </p>
        <div className="flex items-center text-_14 text-bg_7E8B99">
          <span>{new Date(data?.createdDate + "").toLocaleDateString()}</span>
          <div className="w-[1px] h-[16px] bg-br_E9ECEF mx-[8px]" />
          {data?.view ?? 0} {t("button.view_count")}
        </div>
      </div>
    </Link>
  );
});
