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
import { useGetNews } from "../hooks/useGetNews";
import { EventId } from "@constants/contain";
import type { INews } from "@typeRules/news";

type IData = {
  date: string;
  view_count: number;
  title_vn: string;
  title_ko: string;
  description: { _vn: string; _ko: string }[];
};

const data: IData[] = [
  {
    date: "05/18/2023",
    view_count: 256,
    title_vn:
      "Tăng cường mối quan hệ hợp tác Việt - Hàn qua hoạt động văn hóa.",
    title_ko: "문화 활동을 통한 베트남-한국 협력 관계 강화.",
    description: [
      {
        _vn: "Cơ hội quý giá để các bạn sinh viên trực tiếp lắng nghe chia sẻ và trao đổi với chuyên gia Hàn Quốc",
        _ko: "학생들이 한국 전문가들과 직접 듣고, 공유하고, 토론하는 소중한 기회",
      },
      {
        _vn: "Cơ hội quý giá để các bạn sinh viên trực tiếp lắng nghe chia sẻ và trao đổi với chuyên gia Hàn Quốc",
        _ko: "학생들이 한국 전문가들과 직접 듣고, 공유하고, 토론하는 소중한 기회",
      },
    ],
  },
  {
    date: "05/19/2023",
    view_count: 256,
    title_vn: "Chia sẻ kinh nghiệm trong xây dựng giáo trình tiếng Hàn",
    title_ko: "국어 교재 제작 경험 공유",
    description: [
      {
        _vn: "Cơ hội quý giá để các bạn sinh viên trực tiếp lắng nghe chia sẻ và trao đổi với chuyên gia Hàn Quốc",
        _ko: "학생들이 한국 전문가들과 직접 듣고, 공유하고, 토론하는 소중한 기회",
      },
    ],
  },
  {
    date: "05/20/2023",
    view_count: 256,
    title_vn:
      "Ra mắt Tạp chí Văn hóa Nghệ thuật Hàn Quốc Koreana số mùa Thu 2022",
    title_ko: "한국문화예술잡지 코리아나 2022년 가을호 창간",
    description: [
      {
        _vn: "Cơ hội quý giá để các bạn sinh viên trực tiếp lắng nghe chia sẻ và trao đổi với chuyên gia Hàn Quốc",
        _ko: "학생들이 한국 전문가들과 직접 듣고, 공유하고, 토론하는 소중한 기회",
      },
    ],
  },
  {
    date: "05/21/2023",
    view_count: 256,
    title_vn: "Chương trình giao lưu Korea Youth Public Diplomacy Delegation ",
    title_ko: "대한민국 청년공공외교 대표단 교류사업",
    description: [
      {
        _vn: "Cơ hội quý giá để các bạn sinh viên trực tiếp lắng nghe chia sẻ và trao đổi với chuyên gia Hàn Quốc",
        _ko: "학생들이 한국 전문가들과 직접 듣고, 공유하고, 토론하는 소중한 기회",
      },
    ],
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
  const { news } = useGetNews(`${EventId}`);

  const currentIndex = useMemo(() => {
    return data.findIndex(
      (item) =>
        new Date(item.date).toLocaleDateString() ===
        new Date().toLocaleDateString()
    );
  }, []);

  const renderItem = useCallback(
    (item: INews, index: React.Key | null | undefined) => {
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
      path={`${paths.news.prefix}/?type=${EventId}`}
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
          {news.map(renderItem)}
        </SwiperComponent>
        {NavigationElement}
      </div>
    </HomeTopicLayout>
  );
};

type Props = {
  data: INews;
  isActive: boolean;
};

const HomeTopicMonthlyEventsItem = memo(({ data }: Props) => {
  const { t, isVn } = useContext(TranslateContext);
  const date = useMemo(() => {
    return new Date(data?.createdDate + "");
  }, [data?.createdDate]);

  const isActive = useMemo(() => {
    return new Date().toLocaleDateString() === date.toLocaleDateString()
  }, [date])
  return (
    <Link
      to={`${paths.news.prefix}/${paths.news.detail}?slug=trao-thuong`}
      className={clsx(
        "p-[16px] block xl:p-[25px] home-topic-event h-[312px] overflow-y-scroll border-[1px] border-solid border-br_E9ECEF",
        { "home-topic-event-avtive": isActive }
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-_14">
          {t("common._month")} {`${date.getMonth() + 1}`}
        </span>
        <div className="go-down">
          <TextViewCount
            colorEye={Colors.rgba_255_255_255_64}
            className="!text-text_225_225_225_064"
            viewCount={data?.view ?? 0}
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
        {isVn ? data?.title : data?.titleKo}
      </p>
      <div
        className="text-_14 mt-[8px] line-clamp-2 list-disc ml-[12px] home-topic-list-event"
        dangerouslySetInnerHTML={{
          __html: isVn ? data.description : data.descriptionKo,
        }}
      />
    </Link>
  );
});
