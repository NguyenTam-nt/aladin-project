import { SwiperComponent } from "@components/SwiperComponent";
import { windownSizeWidth, withResponsive } from "@constants/index";
import React, { useMemo, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { SliderIndicator } from "@components/SliderIndicator";
import { HomeTopicSalesItem } from "./HomeTopicSalesItem";

const data = [1, 2, 3, 4, 5, 6, 7];

export const HomeTopicSalesSlider = () => {
  const [activeThumb, setThumbActive] = useState<any>(null);
  const width = useMemo(() => {
    return windownSizeWidth > withResponsive._1690
      ? 1600 - 1600 * 0.4 - 80
      : windownSizeWidth - windownSizeWidth * 0.4 - 80;
  }, []);
  const dataRender = Array.from({ length: Math.ceil(data.length / 3) });
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
        slidesPerView={1}
        spaceBetween={24}
        // slidesPerGroup={3}
        style={{
          width,
        }}
      >
        <>
          {dataRender.map((_, indexP) => {
            return (
              <SwiperSlide
                key={indexP}>
                <div  className="grid grid-cols-3 items-center gap-x-[24px]">
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
          })}
        </>
      </SwiperComponent>
      <div className=" absolute bottom-[24px] left-[50%] translate-x-[-50%]">
        <SliderIndicator
          dataLength={dataRender.length}
          setThumbActive={setThumbActive}
        />
      </div>
    </>
  );
};
