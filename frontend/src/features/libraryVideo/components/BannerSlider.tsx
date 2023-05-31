import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { ImageTranslation } from "@components/ImageTranslation";
import { SwiperComponent } from "@components/SwiperComponent";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import type { IGallery } from "@typeRules/gallery";
import React, { useEffect, useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { SwiperSlide } from "swiper/react";

type Props = {
  onSetIndex: (index:number) => void ,
  bannerItem : IGallery[]

}


export const BannerVideoSlider = ({onSetIndex ,bannerItem}:Props) => {
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

  const ImagesData = [...bannerItem?.map(file => file?.files?.[0].link)]

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
    <div className="w-full  h-[full] ">
      <video src={url} />
    </div>
  );
};
