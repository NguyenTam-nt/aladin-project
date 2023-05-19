import { SwiperSlide } from "swiper/react";

import { Navigation, Thumbs } from "swiper";
import { useContext, useState } from "react";
import React from "react";
import { ICArowBack } from "@assets/icons/ICArrowBack";
import { SwiperComponent } from "@components/SwiperComponent";
import useWindowResize from "@hooks/useWindowResize";
import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { Colors } from "@constants/color";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { ModalContext } from "@contexts/ModalContext";
import { withResponsive } from "@constants/container";
import { ICDownload } from "@assets/icons/ICDownload";
import { saveAs } from "file-saver";
import { TranslateContext } from "@contexts/Translation";
type Props = {
  currentIndex: number;
};

const ImagesData = [
  "https://media.istockphoto.com/id/1363664395/vi/anh/sao-bi%E1%BB%83n-v%C3%A0-v%E1%BB%8F-s%C3%B2-tr%C3%AAn-b%C3%A3i-bi%E1%BB%83n-m%C3%B9a-h%C3%A8-trong-n%C6%B0%E1%BB%9Bc-bi%E1%BB%83n-n%E1%BB%81n-m%C3%B9a-h%C3%A8.jpg?s=1024x1024&w=is&k=20&c=20U3sH2E1iqZxhRDpqZrpYDW-6Xykgde2520SJIrfYs=",
  "https://cdn.pixabay.com/photo/2016/04/18/22/05/seashells-1337565_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/07/05/22/16/panorama-3519309_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/25/18/48/watercolor-2681039_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/02/21/12/09/heart-1213475_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/08/31/11/58/woman-6588614_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/09/11/18/23/tower-bridge-441853_960_720.jpg",
  "https://cdn.pixabay.com/photo/2023/05/10/18/20/plant-7984681_640.jpg",
  "https://cdn.pixabay.com/photo/2023/05/10/16/50/squirrel-7984541_640.jpg",
  "https://cdn.pixabay.com/photo/2023/05/11/11/05/glass-sphere-7986102_640.jpg",
  "https://cdn.pixabay.com/photo/2023/05/02/18/13/london-7965770_640.jpg",
  "https://cdn.pixabay.com/photo/2023/04/30/17/31/fish-7961064_640.png",
  "https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_640.jpg",
];

export default function ModalImage({ currentIndex }: Props) {
  const [activeThumb, setThumbActive] = useState<any>();
  const {
    handleNext,
    handlePre,
    navigationNextRef,
    navigationPrevRef,
    NavigationElement,
  } = useSwiperNavigationRef();
  const [currentIndexActive, setCurrentIndex] = useState(currentIndex);
  const { width } = useWindowResize();
  const { hideModal } = useContext(ModalContext);
  const {t} = useContext(TranslateContext)
  const upload = () => {
    let url = ImagesData[currentIndexActive];
    saveAs(url, "hình ảnh");
  };

  return (
    <div className="fixed inset-0 bg-[#0000004d] w-screen h-screen">
      <div className="w-[100vw] p-[44px] h-[100vh] bg-[#212124]">
        <div className="text-_20 md:block z-10" onClick={hideModal}>
          <span className="text-text_white flex items-center cursor-pointer">
            <ICArowBack />{" "}
            <span className="ml-[14px] text-_18 md:text-_24 font-semibold">
              {t("common._back")}
            </span>
          </span>
        </div>
        <div className="relative mt-[44px] px-[40px] md:px-[100px] 2xl:px-[214px]">
          <SwiperComponent
            navigationNextRef={navigationNextRef}
            navigationPrevRef={navigationPrevRef}
            slidesPerView={1}
            spaceBetween={30}
            thumbs={{
              swiper:
                activeThumb && !activeThumb.destroyed ? activeThumb : null,
            }}
            loop={false}
            onActiveIndexChange={(index) => {
              setCurrentIndex(index.activeIndex);
            }}
            initialSlide={currentIndex}
            // zoom={true}
            // grabCursor={true}
            modules={[Navigation, Thumbs]}
            className="h-[500px] md:h-[calc(100vh_-_312px)] w-1920:h-[800px]"
          >
            {ImagesData.map((item, index: any) => {
              return (
                <SwiperSlide key={index} className=" w-full">
                  <img
                    src={item}
                    className="w-full h-full object-contain"
                    alt="ảnh mạng nhé"
                  />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
          {NavigationElement}

          <div
            onClick={handlePre}
            className="absolute z-10 top-[50%] left-[-20px] cursor-pointer translate-y-[-50%]"
          >
            <ICArowLeft color={Colors.text_white} />
          </div>
          <div
            onClick={handleNext}
            className="absolute top-[50%] z-10 right-[-20px]  cursor-pointer translate-y-[-50%]"
          >
            <ICArowRight color={Colors.text_white} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-[66px]">
          <SwiperComponent
            slidesPerView={9}
            initialSlide={currentIndex}
            loop={false}
            navigation={false}
            onSwiper={setThumbActive}
            // watchSlidesProgress={true}
            // freeMode={true}
            style={{
              width:
                width > withResponsive._1024
                  ? width / 3
                  : width > withResponsive._768
                  ? width / 2
                  : width * 0.8,
            }}
            modules={[Thumbs]}
            className="swiper-item-thumb"
          >
            {ImagesData.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="flex justify-center w-[28px] h-[28px]"
                >
                  <img
                    className="max-h-[32px] max-w-[32px] min-w-[32px] min-h-[32px] object-cover rounded-md"
                    src={item}
                    alt="ảnh mạng nhé"
                  />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
          <div
            onClick={upload}
            className="ml-auto md:justify-self-end mt-[24px] md:m-0 cursor-pointer"
          >
            <ICDownload />
          </div>
        </div>
      </div>
    </div>
  );
}
