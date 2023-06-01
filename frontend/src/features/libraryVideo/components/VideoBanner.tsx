
import { TranslateContext } from "@contexts/Translation";
import React, { useContext, useState } from "react";
import { BannerVideoSlider } from "./BannerSlider";
import TagNews from "@components/TagNews";
import { ButtonActionVideo } from "./ButtonActionVideo";
import { ModalContext } from "@contexts/ModalContext";
import ModalVideo from "./ModalVideo";
import type { IGallery } from "@typeRules/gallery";
import { getDate } from "@commons/index";
const VideoBanner = ({bannerItem} : { bannerItem : IGallery[]}) => {
  const {t , isVn} = useContext(TranslateContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const {setElementModal} = useContext(ModalContext)


  

  const showModal = () => {
    setElementModal(<ModalVideo currentIndex={currentIndex}  bannerItem={bannerItem}/>)
  }

  const handlePlayNow = () => {
    showModal()
  }

  const handleCurrentIndex = (index:number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 banner-bg-about "></div>
      {bannerItem?.length > 0 && (
        <BannerVideoSlider
          onSetIndex={handleCurrentIndex}
          bannerItem={bannerItem}
          handlePlayNow={handlePlayNow}
        />
      )}
    </div>
  );
};

export default VideoBanner;
