import { SliderIndicator } from "@components/SliderIndicator";
import { SwiperComponent } from "@components/SwiperComponent";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { BannerText } from "./BannerText";
import { useGetTopic } from "@features/dashboard/home/components/useGetTopic";
import { HomeTopicType } from "@typeRules/home";
import { getLinkImageUrl } from "@commons/common";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { Image } from "@components/Image";

export const BannerSliderImages = () => {
  const [activeThumb, setThumbActive] = useState<any>(null);

  const { listBanner } = useGetTopic(HomeTopicType.banner_home);

  return (
    <div className="w-full absolute inset-0 z-10 h-full">
      <SwiperComponent
        effect={"fade"}
        thumbs={{
          swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        }}
        className="h-full w-full"
        spaceBetween={0}
        initialSlide={0}
        loop={false}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        <>
          {listBanner?.listBanner.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                <div>
                  <div className="absolute z-[4] inset-0">
                    <Image
                      className="w-full absolute inset-0 z-[-1]  h-full object-cover"
                      loading="lazy"
                      alt={getLinkImageUrl(
                        item?.linkMedia,
                        windownSizeWidth >= withResponsive._1024
                          ? 1920
                          : windownSizeWidth,
                          945
                      )}
                    />
                    <BannerText
                      title={item?.title}
                      link={item.redirectUrl}
                      content={item.content}
                    />
                    <div className="absolute inset-0 bg-banner_home z-[2]" />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </>
      </SwiperComponent>
      <div className=" max-w-fit absolute z-[3] bottom-[24px] lg:bottom-[64px] left-[50%] translate-x-[-50%]">
        <SliderIndicator
          dataLength={listBanner?.listBanner.length}
          setThumbActive={setThumbActive}
        />
      </div>
    </div>
  );
};
