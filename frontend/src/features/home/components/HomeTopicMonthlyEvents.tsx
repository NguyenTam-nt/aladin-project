import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { SwiperComponent } from "@components/SwiperComponent";
import { TextViewCount } from "@components/TextViewCount";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { memo, useCallback, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { HomeTopicLayout } from "./HomeTopicLayout";

type IData = {
  date: string;
  view_count: number;
  title: string;
  description: string[];
};

const data: IData[] = [
  {
    date: "05/17/2023",
    view_count: 256,
    title: "Trao thưởng Sinh viên xuất sắc tháng 5",
    description: ["Bạn: Nguyễn Thanh Tâm", "Bạn: Bùi Thị Ngự"],
  },
  {
    date: "05/18/2023",
    view_count: 256,
    title: "Trao thưởng Sinh viên xuất sắc tháng 5",
    description: ["Bạn: Nguyễn Thanh Tâm", "Bạn: Bùi Thị Ngự"],
  },
  {
    date: "05/19/2023",
    view_count: 256,
    title: "Trao thưởng Sinh viên xuất sắc tháng 5",
    description: ["Bạn: Nguyễn Thanh Tâm", "Bạn: Bùi Thị Ngự"],
  },
  {
    date: "05/20/2023",
    view_count: 256,
    title: "Trao thưởng Sinh viên xuất sắc tháng 5",
    description: ["Bạn: Nguyễn Thanh Tâm", "Bạn: Bùi Thị Ngự"],
  },
];

export const HomeTopicMonthlyEvents = () => {
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
  } = useSwiperNavigationRef();
  const { width } = useWindowResize();

  const currentIndex = useMemo(() => {
    return data.findIndex(item => new Date(item.date).toLocaleDateString() ===  new Date().toLocaleDateString())
  }, [])

  const renderItem = useCallback(
    (item: any, index: React.Key | null | undefined) => {
      return (
        <SwiperSlide className="max-w-[70%] m992:max-w-full " key={index}>
          <HomeTopicMonthlyEventsItem
            data={item}
            isActive={index === currentIndex}
          />
        </SwiperSlide>
      );
    },
    [currentIndex]
  );


  return (
    <HomeTopicLayout
      title="home.home_topic._event"
      onNextClick={handleNext}
      onPreClick={handlePre}
      path={`${paths.news.prefix}/${paths.news.event}`}
    >
      <div className="mt-[32px] m992:mt-[52px]">
        <SwiperComponent
          initialSlide={currentIndex}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          slidesPerView={
            width > withResponsive._1536
              ? 4
              : width > withResponsive._1280
              ? 3
              : width > withResponsive._992
              ? 2
              : "auto"
          }
          spaceBetween={width > withResponsive._1536 ? 24 : 16}
        >
          {data.map(renderItem)}
        </SwiperComponent>
        {NavigationElement}
      </div>
    </HomeTopicLayout>
  );
};

type Props = {
  data: IData;
  isActive: boolean;
};

const HomeTopicMonthlyEventsItem = memo(({  data, isActive }: Props) => {
  const {t} = useContext(TranslateContext)
  const date = useMemo(() => {
    return new Date(data.date);
  }, [data.date]);

  // const isActive = useMemo(() => {
  //   return new Date().toLocaleDateString() === date.toLocaleDateString()
  // }, [date])
  return (
    <Link
    to={`${paths.news.prefix}/${paths.news.detail}?slug=trao-thuong`}
      className={clsx(
        "p-[16px] block xl:p-[25px] home-topic-event h-[312px] border-[1px] border-solid border-br_E9ECEF",
        { "home-topic-event-avtive": isActive }
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-_14">{t("common._month")} {`${date.getMonth() + 1}`}</span>
        <div className="go-down">
          <TextViewCount
            colorEye={Colors.rgba_255_255_255_64}
            className="!text-text_225_225_225_064"
            viewCount={data.view_count}
          />
        </div>
      </div>
      <div className="flex justify-between items-start mt-[25px]">
        <span className="text-_48 font-bold leading-[40px]">
          {`00${date.getDate()}`.slice(-2)}
        </span>
        <div className="go-right">
          <ICArrowLeftLong width={131} />
        </div>
      </div>
      <p className="text-_16 font-semibold leading-[28px] line-clamp-2 mt-[8px]">
        {data.title}
      </p>
      <ul className="text-_14 mt-[8px] list-disc ml-[12px] home-topic-list-event">
        {data.description.map((item, index) => {
          return (
            <li
            key={index}
              className="mb-2 go-up"
              style={{
                ["--item-index" as string]: index + 1,
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </Link>
  );
});
