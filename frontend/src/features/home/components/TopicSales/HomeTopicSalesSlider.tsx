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
      : windownSizeWidth > withResponsive._1024 ? windownSizeWidth - windownSizeWidth * 0.4 - 80 : windownSizeWidth - 40 ;
  }, []);
  const dataRender = Array.from({ length: Math.ceil(data.length / (windownSizeWidth > withResponsive._1024 ? 3 : 3)) });
  return (
    <>
      <SwiperComponent
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        thumbs={{
          swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        }}
        slidesPerView={ windownSizeWidth > withResponsive._1024 ? 3 : "auto" }
        spaceBetween={  windownSizeWidth > withResponsive._1024 ? 24 : 16}
        slidesPerGroup={windownSizeWidth > withResponsive._1024 ? 3 : 1}
        style={{
          width
        }}
      >
        <>
          {/* {dataRender.map((_, indexP) => {
            return ( */}
             
              {/* <div  className="grid grid-cols-3 items-center gap-x-[24px]"> */}
                  {data.map((_, index) => {
                    return (
                      <SwiperSlide
                      className="max-w-[70%] lg:max-w-none"
                      key={index}>
                      <HomeTopicSalesItem
                        key={index}
                        index={ index + 1}
                      />
                      </SwiperSlide>
                    );
                  })}
                {/* </div> */}
            {/* );
          })} */}
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
