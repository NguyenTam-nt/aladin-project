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

const data = [
  {
    title_vn: "Giáo viên",
    description_vn:
      "Chương trình đào tạo trình độ đại học ngành Hàn Quốc chất lượng.",
    sub_des_vn: "Vào chiều ngày 27 tháng 3 năm 2023, Lễ Công bố quyết địn,...",
    title_ko: "선생님",
    description_ko: "한국 대학 수준의 양질의 교육 프로그램.",
    sub_des_ko: "2023년 3월 27일 오후, 결정 발표식에서...",
    view_count: 234,
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    title_vn: "Giảng viên",
    description_vn: "Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc",
    sub_des_vn: "Sáng ngày 10 tháng 11 năm 2022, trong khuôn khổ dự án, X..",
    title_ko: "강사",
    description_ko: "베트남과 한국 관계의 30년 여정을 돌아보며",
    sub_des_ko: "2022년 11월 10일 아침, 프로젝트의 틀 내에서 X..",
    view_count: 234,
    image:
      "https://s3-alpha-sig.figma.com/img/e356/1b38/c9807bdf6446aa1ed911b2fc6326262c?Expires=1685318400&Signature=JLDG2iWuWQPmdBpr0fDmVpyovJMSPwOLYGsZ~lDkrAXNQcd8GdLr31hhAFAwTrlFL94yqNBCg~1dSUqYuFdcjF93c7KMAET~gkni8dfiNP-Jw0JzSpu1GGqxsuk3TJhZDWdJt8EuYkC~eIamibGvnVpcAh4ys2BWM~uAEFIrx8LykPMiCEmeVlfu7M29l1B-QcEjCyTgopVs3niKKwaBwlauBdUUJRDhiHx0pkdb7RLr6a7GlZ8ho4xQYBcy8qGLlVvgewFGvft0To783DoLVAsLO78sWOUAOuno8wYjlNnLSoxWh~UCK6S0qKXfScbtJCS4-iU7aE7CSo1vwZFhdw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

type Props = {
  navigationPrevRef: React.RefObject<HTMLDivElement>;
  navigationNextRef: React.RefObject<HTMLDivElement>;
};

export const HomeTopicScientificResearchSlider = ({
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
  data: {
    title_vn: string;
    description_vn: string;
    sub_des_vn: string;
    title_ko: string;
    description_ko: string;
    sub_des_ko: string;
    view_count: number;
    image: string;
  };
};

export const HomeTopicScientificResearchSliderItem = memo(
  ({
    isReversed = false,
    data,
  }: PropsHomeTopicScientificResearchSliderItem) => {
    return (
      <Link
        to={`${paths.news.prefix}/${paths.news.detail}?slug=trao-thuong`}
        className={clsx("flex flex-col", { "flex-col-reverse": isReversed })}
      >
        <div
          className={clsx("h-[274px] w-full overflow-hidden", {
            "mt-[24px]": isReversed,
            "mb-[24px]": !isReversed,
          })}
        >
          <ImageTranslation link={data.image} />
        </div>
        <HomeTopicNewsItem data={data} />
      </Link>
    );
  }
);
