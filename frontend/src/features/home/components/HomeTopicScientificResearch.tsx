import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import { HomeTopicLayout } from "./HomeTopicLayout";
import { HomeTopicScientificResearchSlider } from "./HomeTopicScientificResearchSlider";

const data = [
  {
    title_vn: "Tuyển thành viên tham gia đội K-연구",
    title_ko: "K-연구팀에서 함께 할 팀원을 모집합니다.",
    date: "25/12/2023"
  },
  {
    title_vn: "Đăng ký đề tài Nghiên cứu khoa học Sinh ...",
    title_ko: "과학 연구 주제에 등록 ...",
    date: "25/12/2023"
  },
  {
    title_vn: "Tuyển thành viên tham gia đội K-연구",
    title_ko: "한국학부 학생들, 최우수상 수상…",
    date: "25/12/2023"
  },
  {
    title_vn: "Các buổi học chuyên đề online về Hàn Q,..",
    title_ko: "한국어 주제에 대한 온라인 세미나.",
    date: "25/12/2023"
  },
  {
    title_vn: 'Sinh hoạt khoa học "Từ lý thuyết nghiên,...',
    title_ko: '과학적 활동 "연구 이론에서 ...',
    date: "25/12/2023"
  },
  {
    title_vn: "Chia sẻ kinh nghiệm trong xây dựng giáo,...",
    title_ko: "창 제작 경험 공유, ...",
    date: "25/12/2023"
  },
  {
    title_vn: "Xác định và tăng cường vị thế của Việt N,...",
    title_ko: "베트남의 입지 정의 및 강화",
    date: "25/12/2023"
  }
]

export const HomeTopicScientificResearch = () => {
    const {navigationNextRef, navigationPrevRef, handleNext, handlePre, NavigationElement} = useSwiperNavigationRef()
  return (
    <HomeTopicLayout onNextClick={handleNext} onPreClick={handlePre} title="home.home_topic._study" 
    path={`${paths.news.prefix}/${paths.news.study}`}
    >
      <div className="mt-[44px] flex flex-col-reverse md:flex-row gap-x-[24px]">
        <div className="p-[32px] md:w-[424px] h-auto max-h-[752px]  overflow-hidden text-text_white bg-secondary">
          {
            data.map((item, index) => {
              return <HomeTopicScientificResearchItem key={index} data={item} />
            })
          }
        </div>
        <div className="flex-1 mb-[16px] md:mb-0">
            <HomeTopicScientificResearchSlider navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />
            {NavigationElement}
        </div>
      </div>
    </HomeTopicLayout>
  );
};

type PropsItem = {
  data: {
    title_vn: string,
    title_ko: string,
    date: string
  }
}

export const HomeTopicScientificResearchItem = ({data}:PropsItem) => {
  const {isVn} = useContext(TranslateContext)
  return (
    <Link to={`${paths.news.prefix}/${paths.news.detail}?slug=trao-thuong`} className="pb-2 block border-b-[1px] border-solid border-text_white">
      <p className="text-_16 xl:text-_18 line-clamp-1 leading-[32px]">
       {isVn ? data.title_vn : data.title_ko}
      </p>
      <p className="text-_14 line-clamp-1">25/12/2023</p>
    </Link>
  );
};
