import { SwiperComponent } from "@components/SwiperComponent";
import { windownSizeWidth, withResponsive } from "@constants/index";
import React, { memo, useMemo, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { SliderIndicator } from "@components/SliderIndicator";
import { HomeTopicSalesItem } from "./HomeTopicSalesItem";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const HomeTopicSalesSlider = memo(() => {
  const [activeThumb, setThumbActive] = useState<any>(null);
  const width = useMemo(() => {
    return windownSizeWidth > withResponsive._1690
      ? 1600 - 1600 * 0.4 - 80
      : windownSizeWidth > withResponsive._1024 ?  windownSizeWidth - windownSizeWidth * 0.4 - 80 : windownSizeWidth - 40;
  }, []);
  const dataRender = Array.from({ length: Math.ceil(data.length / (windownSizeWidth > withResponsive._1024 ? 3 : 1)) });
  return (
    <>
      <SwiperComponent
        // grabCursor={true}
        // keyboard={{
        //   enabled: true,
        // }}
        thumbs={{
          swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        }}
        slidesPerView={windownSizeWidth > withResponsive._1024 ? 1 : "auto"}
        spaceBetween={24}
        // slidesPerGroup={3}
        style={{
          width,
        }}
      >
        {windownSizeWidth > withResponsive._1024
          ? dataRender.map((_, indexP) => {
              return (
                <SwiperSlide key={indexP}>
                  <div className="grid grid-cols-3 items-center gap-x-[24px]">
                    {data.slice(indexP * 3, indexP * 3 + 3).map((_, index) => {
                      return (
                        <HomeTopicSalesItem
                          key={index}
                          index={indexP * 3 + index + 1}
                        />
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            })
          : data.map((_, index) => {
              return (
                <SwiperSlide key={index} className="max-w-[70%]">
                  <HomeTopicSalesItem index={index + 1} />
                </SwiperSlide>
              );
            })}
      </SwiperComponent>
      <div className=" absolute bottom-[24px] left-[50%] translate-x-[-50%]">
        <SliderIndicator
          dataLength={dataRender.length}
          setThumbActive={setThumbActive}
        />
      </div>
    </>
  );
})
