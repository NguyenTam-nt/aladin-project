import { NextArrowIcon, PrevArrowIcon } from "@assets/icons";
import BannerServices from "@services/BannerServices";
import { BANNERS } from "@utility/constants";
import SwiperComponent from "commons/SwiperComponent";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";
import "./banner.css";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import CricleButton from "@components/Buttons/CricleButton";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { current } from "@reduxjs/toolkit";
import { colors } from "@utility/colors";
import NextIcon from "@assets/iconElements/NextIcon";

const banner = "/banner.png";

const Banner = ({ className, images, ...props }: any) => {
  const [bannerHomepage, setbannerHomepage] = useState<string[]>([]);
  const {
    navigationPrevRef,
    navigationNextRef,
    handleNext,
    handlePre,
    NavigationElement,
    currentIndex,
    onActiveIndexChange,
    activeThumb,
    setThumbActive,
  } = useSwiperNavigationRef();
  // const pagination = {
  //   clickable: true,
  //   renderBullet: function (index: any, className: any) {
  //     return '<span class="' + className + '"></span>';
  //   },
  // };
  // const getBanner = () => {
  //   try {
  //     BannerServices.getBanner(BANNERS.HOMEPAGE).then((data) => {
  //       setbannerHomepage(data?.images);
  //     });
  //   } catch (error) {
  //     console.log("không lấy được danh sách banner.");
  //   }
  // };
  // useEffect(() => {
  //   getBanner();
  // }, []);
  return (
    <div className={`w-full relative ${className}`} {...props}>
      <SwiperComponent
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
        // spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {images.map((src: string, i: any) => {
          return (
            <SwiperSlide key={i}>
              <img
                src={src}
                className="w-full h-full object-cover"
                alt="image banner homepage"
              />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>
      {images.length > 1 && (
        <>
          <CricleButton
            onClick={() => handlePre()}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 z-10 !border-white "
            icon={<PrevIconElm color={colors.white} />}
          />
          <CricleButton
            icon={<NextIcon color={colors.white} />}
            onClick={() => handleNext()}
            className="absolute right-[5%] top-1/2 -translate-y-1/2 z-10 !border-white"
          />
          {NavigationElement}
        </>
      )}
    </div>
  );
};

export default Banner;
