import { SwiperComponent } from "@components/SwiperComponent";
import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React, { useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import { BannerItemImage } from "./BannerItemImage";

const data = [
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
    title_vn: "Nghiên cứu khoa học",
    subtitle_vn: "Võ học Taekkyeon",
    desc_vn: "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
    title_ko: "과학적 연구",
    subtitle_ko: "택견 무술",
    desc_ko: "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_chemical-6c94e8685bb0b657c1f6690383630295.jpg",
      title_vn: "Tin tức",
      subtitle_vn: "Giáo trình tiếng Hàn",
      desc_vn: "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
      title_ko: "소식",
      subtitle_ko: "한국어 코스",
      desc_ko: "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_pharma-f4fc152d039b10dfacfea4b16e8dcb6d.jpg",
      title_vn: "Đào tạo",
      subtitle_vn: "Kết nối FPT Software",
      desc_vn: "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
      title_ko: "기차",
      subtitle_ko: "FPT 소프트웨어 연결",
      desc_ko: "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_bio-443deb6d4f63b4c424e219d42b3889e0.jpg",
      title_vn: "Tin tức",
      subtitle_vn: "Sổ tay văn hóa Hàn",
      desc_vn: "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
      title_ko: "소식",
      subtitle_ko: "한국 문화 핸드북",
      desc_ko: "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
  {
    image:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
      title_vn: "Hoat dộng Đoàn - Đội",
      subtitle_vn: '"Đổi rác lấy quà"',
      desc_vn: "Trong khuôn khổ dự án xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam của Trường ĐH KHXH&NV, ĐHQG-HCM",
      title_ko: "과학적 연구",
      subtitle_ko: '"쓰레기를 선물로 교환"',
      desc_ko: "인문사회과학대학교 VNU-HCM의 베트남 한국학 핵심대학 건설 프로젝트의 틀에서",
  },
];

export const Banner = () => {
  const length = useMemo(() => data.length, []);
  const { width } = useWindowResize();
  const previewNumber = useMemo(() => {
    return width >= withResponsive._1024
      ? 5
      : width >= withResponsive._640
      ? 3
      : 2;
  }, [width]);
  return (
    <div className="banner_home">
      <div className="flex h-full">
        <SwiperComponent slidesPerView={previewNumber} loop={false}>
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}
              style={{
                ["--animate-count" as string]: index
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
