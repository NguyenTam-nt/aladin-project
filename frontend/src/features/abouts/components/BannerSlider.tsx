import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { SwiperComponent } from "@components/SwiperComponent";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import React, { useEffect, useRef, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { SwiperSlide } from "swiper/react";

export const BannerSlider = () => {
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
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {[1, 2, 3].map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <BannerVideoItem isActive={index === currentIndex} />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>

      <div className="absolute max-w-fit  bottom-2 left-[50%] translate-x-[-50%] z-[5]">
        <SwiperComponent
          slidesPerView={3}
          freeMode={true}
          onSwiper={setThumbActive}
          watchSlidesProgress={true}
          initialSlide={1}
          modules={[Navigation, Thumbs, FreeMode]}
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
        className="absolute hidden lg:block  top-[50%] translate-y-[-50%] left-[110px] z-[5] cursor-pointer"
      >
        <ICArowLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute hidden lg:block top-[50%] translate-y-[-50%] right-[110px] z-[5] cursor-pointer"
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
    <div className="w-full h-[382px]">
      <video
        ref={refVideo}
        // autoPlay
        loop
        muted
        className="w-[100%] object-cover h-full"
      >
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
      </video>
    </div>
  );
};
