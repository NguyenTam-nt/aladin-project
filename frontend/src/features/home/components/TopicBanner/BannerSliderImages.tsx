import { SliderIndicator } from "@components/SliderIndicator";
import { SwiperComponent } from "@components/SwiperComponent";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";

export const BannerSliderImages = () => {
  const [activeThumb, setThumbActive] = useState<any>(null);
  return (
    <div className="w-full h-full">
      <SwiperComponent
        thumbs={{
          swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        }}
        className="h-full w-full"
        spaceBetween={0}
        initialSlide={1}
        loop={false}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <>
          {[1, 2, 3].map((_, index) => {
            return (
              <SwiperSlide key={index}>
                <div>
                  <div className="absolute inset-0 z-[-1]">
                    <img
                      className="w-full h-full object-cover"
                      src="https://s3-alpha-sig.figma.com/img/0559/a298/42e61584d224dd60302fd995ee927c39?Expires=1687132800&Signature=Ud2y5jC8T2CNXBguSuvngGBnk1Gi2G~vkL35QzANootOHHFAk9KOr04Ezvspy5whD~3u6oo4jHWF0kIDaMqveNIW2wOetnCaLecgBzc9NVFl-WL~OHvjy0d07mNnJOsh0AOMcyhwMLNu6Zorkfp7f9ZKg01ePN-vz6U-97OUSUfgLBiSvsGjyynKZTEoQxpAAG8cbj0WyIbuFZChLaj38mhjxhkLB~LdvSql~WXT84sH6~994WHxtLwv4IrQ94xUUokJf5L19jHIEyreCJa65qyYFCjiwAGYqBqxP56FT2TovbGMuLnhN3ab5~9P~NgVG7Xy-k3HRyWrPUAoCCWlOQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </>
      </SwiperComponent>
      <div className=" max-w-fit absolute z-[3] bottom-[64px] left-[50%] translate-x-[-50%]">
        <SliderIndicator dataLength={3}  setThumbActive={setThumbActive} />
      </div>
    </div>
  );
};
