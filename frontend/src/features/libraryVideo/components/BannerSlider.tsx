import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { getDate } from "@commons/index";
import { SwiperComponent } from "@components/SwiperComponent";
import TagNews from "@components/TagNews";
import { TranslateContext } from "@contexts/Translation";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import type { IGallery } from "@typeRules/gallery";
import React, { useContext, useEffect, useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { SwiperSlide } from "swiper/react";
import { ButtonActionVideo } from "./ButtonActionVideo";

type Props = {
  onSetIndex: (index:number) => void ,
  bannerItem : IGallery[]
  handlePlayNow : () => void
}


export const BannerVideoSlider = ({onSetIndex ,bannerItem ,handlePlayNow}:Props) => {
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

  const ImagesData = bannerItem

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
        {ImagesData.map((video, index) => {
          return (
            <SwiperSlide key={index} style={{ alignSelf : "center" , maxHeight : 747}}>
              <BannerVideoItem  video={video} handlePlayNow={handlePlayNow} />
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

const BannerVideoItem = ({video ,handlePlayNow}: {video: IGallery , handlePlayNow : () => void}) => {
const { t ,isVn} = useContext(TranslateContext)

  return (
    <div className="w-full h-full">
      <video src={video.files[0].link} className="w-full  h-auto" />
      <div className="">
        <div className="absolute  bg-gr_text bottom-[0px] left-[0px] z-[4] w-[100%]  text-text_white">
          <div className="mb-[54px] ml-[48px]">
          <TagNews
            title={isVn ? video?.name : video?.nameKo}
          ></TagNews>
          <h3 className=" text-[18px] xl:text-_48 font-semibold xl:font-bold   my-[12px] line-clamp-1">
            {isVn ? video?.name : video?.nameKo}
          </h3>
          <p className=" text-_14 xl:text-_16 font-semibold">
            {t("common.create_day")}: {getDate(video?.createdDate)}
          </p>
          <div className="flex flex-row mt-[38px]">
            <ButtonActionVideo onPlayNow={handlePlayNow}></ButtonActionVideo>
          </div>
          </div>
        </div>
        </div>
    </div>
  );
};
