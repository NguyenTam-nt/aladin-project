import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { SwiperComponent } from "@components/SwiperComponent";
import { TextViewCount } from "@components/TextViewCount";
import { Colors } from "@constants/color";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React, { memo } from "react";
import { SwiperSlide } from "swiper/react";
import { HomeTopicLayout } from "./HomeTopicLayout";

export const HomeTopicMonthlyEvents = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  return (
    <HomeTopicLayout
      title="home.home_topic._event"
      onNextClick={handleNext}
      onPreClick={handlePre}
    >
      <div className="mt-[52px]">
        <SwiperComponent
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          slidesPerView={4}
          loop={false}
          spaceBetween={24}
        >
          <SwiperSlide>
            <HomeTopicMonthlyEventsItem />
          </SwiperSlide>
          <SwiperSlide>
            <HomeTopicMonthlyEventsItem />
          </SwiperSlide>
          <SwiperSlide>
            <HomeTopicMonthlyEventsItem />
          </SwiperSlide>
          <SwiperSlide>
            <HomeTopicMonthlyEventsItem />
          </SwiperSlide>

          <SwiperSlide>
            <HomeTopicMonthlyEventsItem />
          </SwiperSlide>
          <SwiperSlide>
            <HomeTopicMonthlyEventsItem />
          </SwiperSlide>
        </SwiperComponent>
        {NavigationElement}
      </div>
    </HomeTopicLayout>
  );
};

const HomeTopicMonthlyEventsItem = memo(() => {
    return (
        <div className="p-[25px] home-topic-event h-[312px] border-[1px] border-solid border-br_E9ECEF">
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
        <p className="text-_16 font-semibold leading-[28px] line-clamp-2">
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
