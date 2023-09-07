import { SwiperSlideButton } from "@assets/icons";
import React, { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  indexSlide: number;
  nameColor: string;
  // codeColor: string;
  classNavigate: string;
  lisImages: string[];
  imageActived: string | null;
  listImageActived: string[];
  handleActiveImage: (data: string, index: number, isUnActive: boolean) => void;
}
function SliderPreviewImages(props: Props) {
  const {
    indexSlide,
    nameColor,
    // codeColor,
    classNavigate,
    lisImages,
    imageActived,
    listImageActived,
    handleActiveImage,
  } = props;
  const handleActive = (item: string) => {
    const checkActived = listImageActived.includes(item);
    if (checkActived) {
      if (item === imageActived) {
        handleActiveImage(item, indexSlide, true);
        return;
      }
      return;
    }
    handleActiveImage(item, indexSlide, false);
  };
  return (
    <div className="grid grid-cols-5 border-b border-gray-200">
      <div className="col-span-1 flex items-center justify-center border-r border-r-gray-200 text-sm uppercase font-semibold">
        {nameColor}
      </div>
      <div className="col-span-4">
        {lisImages.length > 0 && (
          <div className="w-full p-4 pb-18px relative">
            <Swiper
              slidesPerView={4}
              autoplay={true}
              spaceBetween={30}
              navigation={{
                nextEl: `.${classNavigate}`,
                prevEl: `.prev${classNavigate}`,
              }}
              modules={[Navigation]}
              className="mySwiper h-full"
            >
              {lisImages.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      className={
                        "h-[100px] text-center flex items-center justify-center border rounded-md bg-gray-100 cursor-pointer " +
                        (imageActived === item && "border-main")
                      }
                      onClick={() => handleActive(item)}
                    >
                      <img
                        src={item}
                        alt=""
                        className="rounded-md max-w-full max-h-full"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div
              className={
                "b absolute top-[50%] left-6 z-40 cursor-pointer -translate-y-[50%] " +
                `prev${classNavigate}`
              }
            >
              <SwiperSlideButton width={8} className="rotate-180" />
            </div>
            <div
              className={
                " absolute top-[50%] right-6 z-40 cursor-pointer -translate-y-[50%] " +
                classNavigate
              }
            >
              <SwiperSlideButton width={8} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SliderPreviewImages;
