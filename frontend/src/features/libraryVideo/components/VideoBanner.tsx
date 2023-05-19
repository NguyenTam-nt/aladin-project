
import { TranslateContext } from "@contexts/Translation";
import { BannerSlider } from "@features/abouts/components/BannerSlider";
import React, { useContext, useState } from "react";
import { BannerVideoSlider } from "./BannerSlider";
import TagNews from "@components/TagNews";
import { ButtonActionVideo } from "./ButtonActionVideo";
import { ModalContext } from "@contexts/ModalContext";
import ModalVideo from "./ModalVideo";


const VideoBanner = () => {
  const {t} = useContext(TranslateContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const {setElementModal} = useContext(ModalContext)

  const showModal = () => {
    setElementModal(<ModalVideo currentIndex={currentIndex} />)
  }

  const handlePlayNow = () => {
    showModal()
  }

  const handleCurrentIndex = (index:number) => {
    setCurrentIndex(index)
  }

  return (
    <div className=" relative">
      <div className="absolute inset-0 banner-bg-about z-[2]"></div>
      <BannerVideoSlider onSetIndex={handleCurrentIndex} />
      <div className="absolute  bottom-[54px] left-[48px] z-[4]  w-[70%] text-text_white">
      <TagNews ></TagNews>
        <h3 className=" text-[18px] xl:text-_48 font-semibold xl:font-bold   my-[12px] line-clamp-1">
        Adipiscing tortor donec massa eget duis libero tortor donec venenatis
          et.
        </h3>
        <p className=" text-_14 xl:text-_16 font-semibold">
          {t("common.create_day")}: 25/03/2023
        </p>
        <div className="flex flex-row mt-[38px]">
         <ButtonActionVideo onPlayNow={handlePlayNow}></ButtonActionVideo>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
