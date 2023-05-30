import { SwiperComponent } from "@components/SwiperComponent";
import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React, { useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import { BannerItemImage } from "./BannerItemImage";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import { useGetBanner } from "@features/abouts/components/useGetBanner";
import { BannerType } from "@typeRules/banner";
import { useHandlePost } from "@features/dashboard/hooks/useHandlePost";
import { PostType } from "@typeRules/post";

const data = [
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
    title_vn: "Nghiên cứu khoa học",
    subtitle_vn: "Võ học Taekkyeon",
    desc_vn:
      "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
    title_ko: "과학적 연구",
    subtitle_ko: "택견 무술",
    desc_ko:
      "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_chemical-6c94e8685bb0b657c1f6690383630295.jpg",
    title_vn: "Tin tức",
    subtitle_vn: "Giáo trình tiếng Hàn",
    desc_vn:
      "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
    title_ko: "소식",
    subtitle_ko: "한국어 코스",
    desc_ko:
      "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_pharma-f4fc152d039b10dfacfea4b16e8dcb6d.jpg",
    title_vn: "Đào tạo",
    subtitle_vn: "Kết nối FPT Software",
    desc_vn:
      "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
    title_ko: "기차",
    subtitle_ko: "FPT 소프트웨어 연결",
    desc_ko:
      "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_bio-443deb6d4f63b4c424e219d42b3889e0.jpg",
    title_vn: "Tin tức",
    subtitle_vn: "Sổ tay văn hóa Hàn",
    desc_vn:
      "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
    title_ko: "소식",
    subtitle_ko: "한국 문화 핸드북",
    desc_ko:
      "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
    title_vn: "Hoat dộng Đoàn - Đội",
    subtitle_vn: '"Đổi rác lấy quà"',
    desc_vn:
      "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
    title_ko: "과학적 연구",
    subtitle_ko: '"쓰레기를 선물로 교환"',
    desc_ko:
      "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
];

export const Banner = () => {
  const length = useMemo(() => data.length, []);
  const {banner} = useGetBanner(BannerType.bannerHomePost)
  const { width } = useWindowResize();
  const previewNumber = useMemo(() => {
    return width >= withResponsive._1024
      ? 5
      : width >= withResponsive._640
      ? 3
      : 2;
  }, [width]);
  const { ref, isInView } = useInView();
  const {
    listPost,
  } = useHandlePost(PostType.postBanner);
  return (
    <div className="banner_home mt-[40px]">
      <div className="flex h-full relative" ref={ref}>
        <img className="absolute inset-0 w-full h-full " src={banner?.link} alt="" />
        <SwiperComponent slidesPerView={previewNumber} loop={false}>
          {listPost.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={clsx({
                  " animate__animated animate__fadeInUp": isInView,
                })}
                style={{
                  ["--animate-count" as string]: index,
                }}
              >
                <BannerItemImage key={index} data={item} length={length} />
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>

        </SwiperSlide> */}
        </SwiperComponent>
      </div>
    </div>
  );
};
