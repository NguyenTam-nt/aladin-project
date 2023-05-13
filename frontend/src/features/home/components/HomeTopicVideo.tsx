import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { SwiperComponent } from "@components/SwiperComponent";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import YouTube from "react-youtube";
import { SwiperSlide } from "swiper/react";

export const HomeTopicVideo = () => {
    const {width} = useWindowResize()
  return (
    <div className="w-rp mb-[32px] xl:mb-[120px]">
      <SwiperComponent slidesPerView={width > withResponsive._768 ? 2 : "auto"} spaceBetween={width > withResponsive._768 ? 0 : 16}>
        <SwiperSlide className=" max-w-[95%] md:max-w-full h-auto">
          <div className="relative h-[144px] md:h-[282px] home-topic-video-bg px-[32px] flex items-center">
            <div className="absolute inset-0 z-[-1] ">
              <img
                className="w-full h-full object-cover"
                src="https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/29faa76315d5ebbe2c41509ef77d3293_70303_9.jpg"
                alt=""
              />
            </div>
            <div>
              <p className="text-_24 font-semibold text-text_white">
                Varius cras at risus nunc ut amet.
              </p>
              <p className="text-_14 text-text_225_225_225_064 mt-[8px] mb-[24px]">
                Nunc pretium cursus et orci nisl.{" "}
              </p>
              <div>
                <ICArrowLeftLong width={147} color={Colors.text_white} />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="max-w-[95%] md:max-w-full">
          <div>
            <YouTube
              videoId="2tTlusUnZmE"
              className="w-full"
              opts={{
                width: "100%",
                height: width > withResponsive._768 ? "282px" : "144px",
              }}
            />
          </div>
        </SwiperSlide>
      </SwiperComponent>
    </div>
  );
};
