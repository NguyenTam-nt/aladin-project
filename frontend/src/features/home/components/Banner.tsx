import { SwiperComponent } from "@components/SwiperComponent";
import { width, withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React, { useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import { BannerItemImage } from "./BannerItemImage";

const data = [
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_chemical-6c94e8685bb0b657c1f6690383630295.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_pharma-f4fc152d039b10dfacfea4b16e8dcb6d.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_bio-443deb6d4f63b4c424e219d42b3889e0.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
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
              <SwiperSlide key={index}>
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
