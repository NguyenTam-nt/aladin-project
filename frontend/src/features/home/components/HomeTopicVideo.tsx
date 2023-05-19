import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { SwiperComponent } from "@components/SwiperComponent";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useInView from "@hooks/useInView";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { SwiperSlide } from "swiper/react";

const data = {
  title_vn: "Đánh giá năng lực ĐHQG-HCM vào Trường ĐHKHXH&NV",
  des_vn: "Trường ĐHKHXH&NV dành 15-20% chỉ tiêu xét tuyển dựa trên kết quả kỳ thi",
  title_ko: "VNU-HCM의 인문사회과학대학교 입학 역량 평가",
  des_ko: "인문사회대학교는 시험 결과에 따라 입학 목표의 15-20%를 지출합니다.",
  image: "https://s3-alpha-sig.figma.com/img/ff73/1821/625a346c50f0bb567ced54df439e3444?Expires=1685318400&Signature=XjueGfbiNyncEYO-xK2PsZvlM0WwtoSc63g6A6Z34OY1c~rjOP2RE3inYmDBm24D5xGwaPm1-ZmEjDoqZcFMXUh2l0s6Qb3DO9L7Ke3qJVRZ8LKbYlB4oORdH03T2UKxhPGCaosyUCdm5EVRXn4MAw~sSOKVdaMonoOAowQhcrRZDraqJoJ1OPekc7~x1XM9UFkHynOMPodi7k2wbgCCUYvOLAdOvl7dWaCJ0iJ5GBrqEBQircDo0rmzTrxPXRL2w-cyVK8wsHc59zhuocrlSmyUUvSNXjtbdE5vo2zLcP1IUbW7pAjdDBue~YgQqQ4vO3lFLRBHTUtBn2C71B08bg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
}

export const HomeTopicVideo = () => {
  const { width } = useWindowResize();
  const { ref, isInView } = useInView();
  const {isVn} = useContext(TranslateContext)

  return (
    <div className="w-rp mb-[32px] xl:mb-[120px]">
      <SwiperComponent
        slidesPerView={width > withResponsive._768 ? 2 : "auto"}
        spaceBetween={width > withResponsive._768 ? 0 : 16}
      >
        <SwiperSlide className=" max-w-[95%] md:max-w-full h-auto">
          <div ref={ref} className={clsx({"animate__animated animate__fadeInLeft": isInView})}>
            <Link
              to={`${paths.news.prefix}/${paths.news.detail}?slug=trao-thuong`}
              className="relative h-[144px] md:h-[282px] home-topic-video-bg px-[32px] flex items-center"
            >
              <div className="absolute inset-0 z-[-1] ">
                <img
                  className="w-full h-full object-cover"
                  src={data.image}
                  alt=""
                />
              </div>
              <div>
                <p className={clsx("text-_18 md:text-_24 font-semibold text-text_white line-clamp-1")}>
                  {isVn ? data.title_vn : data.title_ko}
                </p>
                <p className={clsx("text-_14 text-text_225_225_225_064 mt-[8px] mb-[24px] line-clamp-1")}>
                {isVn ? data.des_vn : data.des_ko}
                </p>
                <div className={clsx({"go-right-only": isInView})}>
                  <ICArrowLeftLong width={147} color={Colors.text_white} />
                </div>
              </div>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="max-w-[95%] md:max-w-full">
          <div className={clsx({"animate__animated animate__fadeInRight": isInView})}>
            <YouTube
              videoId="2tTlusUnZmE"
              className="w-full"
              opts={{
                width: "100%",
                height: width > withResponsive._768 ? "282px" : "144px",
              }}
            />
          </div>
        </SwiperSlide>
      </SwiperComponent>
    </div>
  );
};
