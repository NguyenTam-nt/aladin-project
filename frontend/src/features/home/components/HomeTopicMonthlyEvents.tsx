import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { SwiperComponent } from "@components/SwiperComponent";
import { TextViewCount } from "@components/TextViewCount";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { memo, useCallback, useState } from "react";
import { SwiperSlide } from "swiper/react";
import type { Swiper } from "swiper/types";
import { HomeTopicLayout } from "./HomeTopicLayout";

export const HomeTopicMonthlyEvents = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  const [currentIndex, setCurrentIndex] = useState(0)
  const {width} = useWindowResize()
  const renderItem = useCallback((_: any, index: React.Key | null | undefined) => {
    return (
      <SwiperSlide className="max-w-[70%] m992:max-w-full " key={index}>
        <HomeTopicMonthlyEventsItem isActive={index === currentIndex} />
      </SwiperSlide>
      )
  }, [currentIndex])

  const onActiveIndexChange = (swiper: Swiper) => {
    setCurrentIndex(swiper.activeIndex);
  }

  return (
    <HomeTopicLayout
      title="home.home_topic._event"
      onNextClick={handleNext}
      onPreClick={handlePre}
    >
      <div className="mt-[32px] m992:mt-[52px]">
        <SwiperComponent
         onActiveIndexChange={onActiveIndexChange}
        initialSlide={currentIndex}

          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          slidesPerView={width > withResponsive._1536 ? 4 : (width > withResponsive._1280 ? 3 : width > withResponsive._992 ? 2 : "auto")  }
          loop={false}
          spaceBetween={width > withResponsive._1536 ? 24 : 16}
        >
          {
            [1, 2, 3, 4, 5].map(renderItem)
          }
        </SwiperComponent>
        {NavigationElement}
      </div>
    </HomeTopicLayout>
  );
};

const HomeTopicMonthlyEventsItem = memo(({isActive}: {isActive: boolean}) => {
    return (
        <div className={clsx("p-[16px] xl:p-[25px] home-topic-event h-[312px] border-[1px] border-solid border-br_E9ECEF", {"home-topic-event-avtive": isActive})}>
        <div className="flex justify-between items-center">
          <span className="text-_14">tháng 5</span>
          <div className="go-down">
            <TextViewCount
              colorEye={Colors.rgba_255_255_255_64}
              className="!text-text_225_225_225_064"
              viewCount={256}
            />
          </div>
        </div>
        <div className="flex justify-between items-start mt-[25px]">
          <span className="text-_48 font-bold leading-[40px]">09</span>
          <div className="go-right">
            <ICArrowLeftLong width={131} />
          </div>
        </div>
        <p className="text-_16 font-semibold leading-[28px] line-clamp-2 mt-[8px]">
          Magna tortor pellentesque tristique tincidunt. Fames turpis le.
        </p>
        <ul className="text-_14 mt-[8px] list-disc ml-[12px] home-topic-list-event">
          <li
            className="mb-2 go-up"
            style={{
              ["--item-index" as string]: 1,
            }}
          >
            Magna tortor pellentesque tristique.
          </li>
          <li
            className="go-up"
            style={{
              ["--item-index" as string]: 2,
            }}
          >
            Magna tortor pellentesque tristique.
          </li>
        </ul>
      </div>
    )
})
