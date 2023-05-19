import { SwiperComponent } from "@components/SwiperComponent";
import {  withResponsive } from "@constants/container";
import { TranslateContext } from "@contexts/Translation";
import useInView from "@hooks/useInView";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { memo, useContext, useMemo } from "react";
import { Navigation } from "swiper";
import { SwiperSlide } from "swiper/react";

let data = [
  {
    title_vn: "Kết quả xét tốt nghiệp đợt 1 năm 2023 hệ Chính quy và Văn bằng 2",
    title_ko: "2023년 1차 일반 및 디플로마 2 졸업 결과",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Thực hiện khảo sát sinh viên tốt nghiệp đợt 2 năm 2022",
    title_ko: "2022년 2차 졸업생 설문조사 실시",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Thời khóa biểu các lớp hệ Chính quy học kỳ 2 năm học 2022-2023",
    title_ko: "2022-2023학년도 2학기 정규수업시간표",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Nộp hồ sơ xét tốt nghiệp đợt 1 năm 2023",
    title_ko: "2023년 1차 졸업 지원서 제출",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Khảo sát ý kiến sinh viên về môn học trong học kỳ 1 năm học 2022-2023",
    title_ko: "2022~2023학년도 1학기 주제에 대한 학생들의 의견 조사",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Thông báo v/v phúc khảo bài thi kết thúc môn học học kỳ 3, năm học 2021-2...",
    title_ko: "2021-2학년도 3학기 기말고사 심사공고...",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Chuỗi chương trình “Việt - Hàn Kết Nối 2022 tại TP. Hồ Chí Minh",
    title_ko: '일련의 프로그램 "Vietnam - Korea Connect 2022 in Ho Chi Minh City. 호치민',
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Chương trình giao lưu Korea Youth Public Diplomacy Delegation",
    title_ko: "대한민국 청년공공외교 대표단 교류사업",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: "Chương trình trao đổi sinh viên với Đại học Daegu Haany, Hàn Quốc",
    title_ko: "한국 대구한의대학교 학생교류 프로그램",
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: 'Cuộc chi "The Link Between You and Me: The Bridge to Korea"',
    title_ko: '"너와 나의 연결고리: 한국으로 가는 다리" 공모전',
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: 'Tuyển bổ sung sinh viên tham gia chương trình "OK Class"',
    title_ko: '"OK Class" 프로그램에 참여할 학생을 추가 모집합니다.',
    date: "25/12/2023",
    view_count: 25
  },
  {
    title_vn: 'Thông báo mức học phí bậc đại học năm học 2022-2023',
    title_ko: '2022~2023학년도 학부 등록금 안내',
    date: "25/12/2023",
    view_count: 25
  },
];


type Props = {
  navigationNextRef: React.RefObject<HTMLDivElement>;
  navigationPrevRef: React.RefObject<HTMLDivElement>;
};

export const HomeTopicNoticeSlider = ({
  navigationNextRef,
  navigationPrevRef,
}: Props) => {
  const noticeCountItems = useMemo(() => {
    return Array.from({ length: Math.ceil(data.length / 6) }, (_, i) => i);
  }, []);
  const {width} = useWindowResize()
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
            {data.slice(_index * 6, 6*(_index+1)).map((item, index) => {
              return <HomeNoticeSliderItem isDisable={_index > 1} isEven={(_index+1)%2 === 0} index={index} data={item} key={index} />;
            })}
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};

type PropsSwiper = {
    data: {
      title_vn: string,
      title_ko: string,
      date: string,
      view_count: number
    }
    index?: number
    isEven?: boolean
    isDisable?: boolean
}


const HomeNoticeSliderItem = memo(({data, index = 0, isEven, isDisable}:PropsSwiper) => {
  const { t, isVn } = useContext(TranslateContext);
  const {ref, isInView} = useInView()
  return (
    <div 
    ref={ref} 
    className={clsx("pb-[8px] border-b-[1px] border-solid border-br_E9ECEF animate__animated",
     {"animate__fadeInLeft": !isEven && isInView && !isDisable, "animate__fadeInRight": isEven && isInView && !isDisable})}
      style={{
        ['--animate-count' as string]: index
      }}
     >
      <p className=" leading-[32px] line-clamp-1 text-_16 m992:text-_18 font-semibold text-text_primary">
       {isVn ? data.title_vn : data.title_ko}
      </p>
      <div className="flex items-center text-_14 text-bg_7E8B99">
        <span>{data.date}</span>
        <div className="w-[1px] h-[16px] bg-br_E9ECEF mx-[8px]" />
        {data.view_count} {t("button.view_count")}
      </div>
    </div>
  );
});
