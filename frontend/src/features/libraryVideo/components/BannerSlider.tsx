import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { SwiperComponent } from "@components/SwiperComponent";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React, { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { SwiperSlide } from "swiper/react";

export const BannerVideoSlider = () => {
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
        {[1, 2, 3].map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <BannerVideoItem isActive={index === currentIndex} />
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
          {[1, 2, 3].map((_, index) => {
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

const BannerVideoItem = ({isActive}: {isActive: boolean}) => {
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(isActive) {
        refVideo.current?.play()
    }else {
        refVideo.current?.pause()
    }
  }, [isActive])

  return (
   
    <div className="w-full  h-[747px] ">
      <video
        ref={refVideo}
        // autoPlay
        loop
        muted
        className="w-[100%] object-cover h-full"
      >
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
      </video>
    </div>
  );
};
