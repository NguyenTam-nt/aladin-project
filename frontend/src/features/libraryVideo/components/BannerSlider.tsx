import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { SwiperComponent } from "@components/SwiperComponent";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React, { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { SwiperSlide } from "swiper/react";

type Props = {
  onSetIndex: (index:number) => void
}

const ImagesData = [
  "https://media.istockphoto.com/id/1363664395/vi/anh/sao-bi%E1%BB%83n-v%C3%A0-v%E1%BB%8F-s%C3%B2-tr%C3%AAn-b%C3%A3i-bi%E1%BB%83n-m%C3%B9a-h%C3%A8-trong-n%C6%B0%E1%BB%9Bc-bi%E1%BB%83n-n%E1%BB%81n-m%C3%B9a-h%C3%A8.jpg?s=1024x1024&w=is&k=20&c=20U3sH2E1iqZxhRDpqZrpYDW-6Xykgde2520SJIrfYs=",
  "https://cdn.pixabay.com/photo/2016/04/18/22/05/seashells-1337565_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/07/05/22/16/panorama-3519309_960_720.jpg",
];

export const BannerVideoSlider = ({onSetIndex}:Props) => {
  const [activeThumb, setThumbActive] = useState<any>(null);
  const {
    navigationNextRef,
    navigationPrevRef,
    handleNext,
    handlePre,
    NavigationElement,
    currentIndex,
    onActiveIndexChange
  } = useSwiperNavigationRef();

  useEffect(() => {
    onSetIndex(currentIndex)
  }, [currentIndex, onSetIndex])

  return (
    <>
      <SwiperComponent
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
        onActiveIndexChange={onActiveIndexChange}
        initialSlide={currentIndex}
        slidesPerView={1}
        thumbs={{
          swiper: activeThumb && !activeThumb?.destroyed ? activeThumb : null,
        }}
        modules={[Navigation, Thumbs]}
      >
        {ImagesData.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <BannerVideoItem url={url}  />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>

      <div className="absolute max-w-fit  bottom-[38px]  right-[47px] z-[5]">
        <SwiperComponent
          slidesPerView={3}
          onSwiper={setThumbActive}
          watchSlidesProgress={true}
          initialSlide={1}
          modules={[Navigation, Thumbs]}
          className="h-[20px] swiper-banner-home"
        >
          {ImagesData.map((_, index) => {
            return (
              <SwiperSlide key={index} className="h-[4px]">
                <div className="w-[16px] lg:w-[32px] h-[2px] lg:h-[4px] mr-[8px] bg-text_white cursor-pointer"></div>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      </div>
      {NavigationElement}

      <button
        onClick={handlePre}
        className="absolute hidden lg:block  top-[50%] translate-y-[-91px] left-[110px] z-[5] cursor-pointer"
      >
        <ICArowLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute hidden lg:block top-[50%] translate-y-[-91px] right-[110px] z-[5] cursor-pointer"
      >
        <ICArowRight />
      </button>
    </>
  );
};

const BannerVideoItem = ({url}: {url: string}) => {


  return (
   
    <div className="w-full  h-[747px] ">
      <img className="w-[100%] object-cover h-full" src={url} alt="" />
    </div>
  );
};
