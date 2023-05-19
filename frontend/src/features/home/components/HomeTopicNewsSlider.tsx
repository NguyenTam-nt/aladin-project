import React from "react";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { SwiperSlide } from "swiper/react";

import { Grid, Navigation, Pagination } from "swiper";
import { withResponsive } from "@constants/container";
import { SwiperComponent } from "@components/SwiperComponent";
import useWindowResize from "@hooks/useWindowResize";

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
};

const data = [
  {
    title_vn: "Hoạt động cựu sinh viên",
    description_vn:
      'Chương trình gây quỹ "Hỗ trợ sinh viên gặp khó khăn do Covid-19"',
    sub_des_vn: "Lời đầu tiên, Khoa học Hàn Quốc xin cảm ơn vì được anh,...",
    title_ko: "동문 활동",
    description_ko: "코로나19로 어려움을 겪는 학생들을 위한 모금 프로그램",
    sub_des_ko: "먼저, 한국 과학은 제가 되어주셔서 감사합니다,...",
    view_count: 256
  },
  {
    title_vn: "Nghiên cứu khoa học",
    description_vn:
      '"Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"',
    sub_des_vn: 'Buổi sinh hoạt khoa học với chủ đề "Từ lý thuyết nghiên,...',
    title_ko: "과학적 연구",
    description_ko:
      '"연구 이론에서 대학원 논문 디자인 실습까지"',
    sub_des_ko: '"연구 이론에서,...',
    view_count: 363
  },
  {
    title_vn: "Hoạt động cựu sinh viên",
    description_vn:
      'Chương trình gây quỹ "Hỗ trợ sinh viên gặp khó khăn do Covid-19"',
    sub_des_vn: "Lời đầu tiên, Khoa học Hàn Quốc xin cảm ơn vì được anh,...",
    title_ko: "동문 활동",
    description_ko: "코로나19로 어려움을 겪는 학생들을 위한 모금 프로그램",
    sub_des_ko: "먼저, 한국 과학은 제가 되어주셔서 감사합니다,...",
    view_count: 256
  },
  {
    title_vn: "Nghiên cứu khoa học",
    description_vn:
      '"Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"',
    sub_des_vn: 'Buổi sinh hoạt khoa học với chủ đề "Từ lý thuyết nghiên,...',
    title_ko: "과학적 연구",
    description_ko:
      '"연구 이론에서 대학원 논문 디자인 실습까지"',
    sub_des_ko: '"연구 이론에서,...',
    view_count: 363
  },
];

export const HomeTopicNewsSlider = ({
  navigationPrevRef,
  navigationNextRef,
}: Props) => {
  const { width } = useWindowResize();
  return (
    <SwiperComponent
      navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      slidesPerView={width > withResponsive._1280 ? 2 : 1}
      spaceBetween={24}
      // grid={{
      //   rows: width > withResponsive._1280 ? 1 : 2,
      // }}
      loop={false}
      // loopFillGroupWithBlank={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      modules={[Grid, Navigation, Pagination]}
      style={{
        width:
          width >= withResponsive._1536
            ? 1200 - 424 - 24
            : width >= withResponsive._1024
            ? width * 0.9 - 424 - 24
            : width >= withResponsive._768
            ? width - 366 - 16 - 20 * 2
            : width - 20 * 2,
      }}
    >
      {/* <> */}
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <HomeTopicNewsItem
              index={index}
              data={item}
              isChangeColor={(index + 1) % 2 === 0}
            />
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};
