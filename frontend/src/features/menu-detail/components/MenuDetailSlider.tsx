import { ICArrowNext } from "@assets/icons/ICArrowNext";
import { ICArrowPre } from "@assets/icons/ICArrowPre";
import { ICPlay } from "@assets/icons/ICPlay";
import { SwiperComponent } from "@components/SwiperComponent";
import { Video } from "@components/Video";
import { Colors } from "@constants/color";
import useInView from "@hooks/useInView";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import type { IListMedia } from "@typeRules/product";
import { MediaType } from "@typeRules/product";
import clsx from "clsx";
import React, { memo, useMemo } from "react";
import { SwiperSlide } from "swiper/react";

type PropsDetail = {
  data: IListMedia[];
};

export const MenuDetailSlider = memo(({ data }: PropsDetail) => {
  const {
    navigationNextRef,
    navigationPrevRef,
    NavigationElement,
    handleNext,
    handlePre,
    currentIndex,
    onActiveIndexChange,
    setThumbActive,
    activeThumb,
  } = useSwiperNavigationRef();
  return (
    <div className=" w-full lg:w-[424px]">
      <MenuDetailSliderMain
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
        onActiveIndexChange={onActiveIndexChange}
        activeThumb={activeThumb}
        data={data}
      />
      {NavigationElement}
      <MenuDetailSliderSlide
        handleNext={handleNext}
        handlePre={handlePre}
        currentIndex={currentIndex}
        setThumbActive={setThumbActive}
        data={data}
      />
    </div>
  );
});

type Props = {
  navigationPrevRef?: React.RefObject<HTMLDivElement>;
  navigationNextRef?: React.RefObject<HTMLDivElement>;
  onActiveIndexChange: (event: any) => void;
  activeThumb: any;
  data: IListMedia[];
};

const MenuDetailSliderMain = memo(
  ({
    navigationNextRef,
    navigationPrevRef,
    onActiveIndexChange,
    activeThumb,
    data,
  }: Props) => {
    const { ref, isInView } = useInView<HTMLDivElement>();
    const initSlide = useMemo(() => {
      const index = data.findIndex((i) => i.type === MediaType.video);
      return index >= 0 ? index : 0;
    }, [data]);
    return (
      <div ref={ref}>
        <SwiperComponent
          initialSlide={initSlide}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          onActiveIndexChange={onActiveIndexChange}
          slidesPerView={1}
          spaceBetween={2}
          thumbs={{
            swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
          }}
        >
          {data.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div
                  className={clsx(
                    "w-full h-[100vw] lg:h-[424px] rounded-[32px_0_32px_0] !overflow-hidden opacity-0 duration-700 ease-linear",
                    {
                      "opacity-100": isInView,
                    }
                  )}
                >
                  {item.type === MediaType.image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={item?.linkMedia}
                      alt=""
                    />
                  ) : (
                    <Video src={item?.linkMedia} controls />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      </div>
    );
  }
);

type PropsMenuDetailSliderSlide = {
  setThumbActive: any;
  handlePre: () => void;
  handleNext: () => void;
  currentIndex: number;
  data: IListMedia[];
};

const MenuDetailSliderSlide = memo(
  ({
    setThumbActive,
    handleNext,
    handlePre,
    currentIndex,
    data,
  }: PropsMenuDetailSliderSlide) => {
    const { ref, isInView } = useInView<HTMLDivElement>();
    return (
      <div ref={ref} className="mt-[16px] lg:mt-[24px] relative">
        <SwiperComponent
          onSwiper={setThumbActive}
          slidesPerView={4}
          spaceBetween={24}
          className="swiper-item-thumb"
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide
                key={item.id}
                className={clsx(
                  "w-full h-[calc(calc(100vw_-_104px)_/_4)] lg:h-[88px] rounded-[16px_0_16px_0] !overflow-hidden",
                  {
                    "animate__animated animate__fadeInRight": isInView,
                  }
                )}
                style={{
                  ["--animate-count" as string]: index,
                }}
              >
                <div className="w-full rounded-[16px_0_16px_0] h-[calc(calc(100vw_-_104px)_/_4)] !overflow-hidden duration-300 ease-in relative lg:h-[88px]">
                  {item.type === MediaType.image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={item?.linkMedia}
                      alt=""
                    />
                  ) : (
                    <>
                      <Video src={item?.linkMedia} />
                      <div className="w-[20px] flex items-center justify-center h-[20px] rounded-[50%] backdrop-blur-[2px] absolute bg-bg_255_255_255_03 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <ICPlay />
                      </div>
                    </>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
        {data.length > 4 ? (
          <>
            <button
              onClick={handlePre}
              className=" z-[2] flex items-center justify-center backdrop-blur-[2px] absolute bg-bg_255_255_255_08 w-[24px] h-[24px] rounded-[5px_0_5px_0] left-0 top-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
              <ICArrowPre
                color={
                  currentIndex <= 0 ? Colors.text_A1A0A3 : Colors.secondary
                }
              />
            </button>
            <button
              onClick={handleNext}
              className=" z-[2] flex items-center justify-center backdrop-blur-[2px] absolute bg-bg_255_255_255_08 w-[24px] h-[24px] rounded-[5px_0_5px_0] right-0 top-[50%] translate-x-[50%] translate-y-[-50%]"
            >
              <ICArrowNext
                color={
                  currentIndex >= data.length - 1
                    ? Colors.text_A1A0A3
                    : Colors.secondary
                }
              />
            </button>
          </>
        ) : null}
      </div>
    );
  }
);
