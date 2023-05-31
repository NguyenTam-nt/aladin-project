import { SwiperSlide } from "swiper/react";

import { Navigation, Thumbs } from "swiper";
import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { ICArowBack } from "@assets/icons/ICArrowBack";
import { SwiperComponent } from "@components/SwiperComponent";
import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { Colors } from "@constants/color";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { ModalContext } from "@contexts/ModalContext";
import { ICDownload } from "@assets/icons/ICDownload";
import { TranslateContext } from "@contexts/Translation";
import axios from "axios";
import { Loading } from "@components/Loading";
import clsx from "clsx";
import type { IGallery } from "@typeRules/gallery";
type Props = {
  currentIndex: number;
  bannerItem : IGallery[]
};

const ImagesVideo = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
];

const ImagesData = [
  "https://media.istockphoto.com/id/1363664395/vi/anh/sao-bi%E1%BB%83n-v%C3%A0-v%E1%BB%8F-s%C3%B2-tr%C3%AAn-b%C3%A3i-bi%E1%BB%83n-m%C3%B9a-h%C3%A8-trong-n%C6%B0%E1%BB%9Bc-bi%E1%BB%83n-n%E1%BB%81n-m%C3%B9a-h%C3%A8.jpg?s=1024x1024&w=is&k=20&c=20U3sH2E1iqZxhRDpqZrpYDW-6Xykgde2520SJIrfYs=",
  "https://cdn.pixabay.com/photo/2016/04/18/22/05/seashells-1337565_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/07/05/22/16/panorama-3519309_960_720.jpg",
];

export default function ModalVideo({ currentIndex  ,bannerItem}: Props) {

  const ImagesVideo = [...bannerItem.map((file) => file.files[0].link)];


  
  const [activeThumb, setThumbActive] = useState<any>();
  const {
    handleNext,
    handlePre,
    navigationNextRef,
    navigationPrevRef,
    NavigationElement,
  } = useSwiperNavigationRef();
  const [currentIndexActive, setCurrentIndex] = useState(currentIndex);
  const { hideModal } = useContext(ModalContext);
  const [isOpenLoading, setIsOpenLoading] = useState(false);
  const { t } = useContext(TranslateContext);
  const upload = () => {
    let url = ImagesVideo[currentIndexActive];
    downloadVideo(url);
    // saveAs(url, "video");
  };

  const downloadVideo = (urls: string) => {
    setIsOpenLoading(true);
    axios({
      url: urls,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const urlObject = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = urlObject;
        link.setAttribute("download", "video.mp4");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .finally(() => {
        setIsOpenLoading(false);
      });
  };

  return (
    <div className="bg-[#0000004d] w-screen h-screen">
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
            className="h-[500px] md:h-[calc(100vh_-_312px)]"
          >
            {ImagesVideo.map((item, index: any) => {
              return (
                <SwiperSlide key={index} className=" w-full">
                  <VideoItem
                    url={item}
                    isActive={currentIndexActive === index}
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
            slidesPerView={ImagesVideo.length >= 9 ? 9 : ImagesVideo.length}
            spaceBetween={12}
            initialSlide={currentIndex}
            loop={false}
            navigation={false}
            onSwiper={setThumbActive}
            style={{
              width:
                (32 + 12) * (ImagesVideo.length >= 9 ? 9 : ImagesVideo.length),
            }}
            modules={[Thumbs]}
            className="swiper-item-thumb"
          >
            {ImagesVideo.map(
              (item, index) => {
           
                
                return (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center w-[28px] h-[28px]"
                  >
                    <video
                      className="max-h-[32px] max-w-[32px] min-w-[32px] min-h-[32px] object-cover rounded-md"
                      src={item}
                    />
                  </SwiperSlide>
                );
              }
            )}
          </SwiperComponent>
          {!isOpenLoading ? (
            <div
              className={clsx(
                "ml-auto md:justify-self-end mt-[24px] md:m-0 cursor-pointer"
              )}
            >
              <div onClick={upload}>
                <ICDownload />
              </div>
            </div>
          ) : (
            <div className="animate__animated animate__fadeInRight">
              <Loading />
              <p className="text-center text-white font-normal text-_16">
                {t("button._loading")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type PropVideoItem = {
  url: string;
  isActive: boolean;
};

const VideoItem = ({ url, isActive }: PropVideoItem) => {
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (refVideo.current) {
      console.log({ isActive });
      if (isActive) {
        refVideo.current.play();
      } else {
        refVideo.current.pause();
      }
    }
  }, [isActive]);

  return (
    <video ref={refVideo} className="w-full h-full object-contain" controls>
      <source src={url} />
    </video>
  );
};
