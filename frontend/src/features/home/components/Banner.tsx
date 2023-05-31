import { SwiperComponent } from "@components/SwiperComponent";
import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React, { useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import { BannerItemImage } from "./BannerItemImage";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import { useGetBanner } from "@features/abouts/components/useGetBanner";
import { BannerType } from "@typeRules/banner";
import { useHandlePost } from "@features/dashboard/hooks/useHandlePost";
import { PostType } from "@typeRules/post";

export const Banner = () => {
  const { banner } = useGetBanner(BannerType.bannerHomePost);
  const { width } = useWindowResize();
  const { listPost } = useHandlePost(PostType.postBanner);
  const previewNumber = useMemo(() => {
    return width >= withResponsive._1024
      ? listPost?.length
      : width >= withResponsive._640
      ? 3
      : 2;
  }, [listPost?.length, width]);
  const { ref, isInView } = useInView();

  return (
    <div className="banner_home mt-[40px]">
      <div className="flex h-full relative" ref={ref}>
        <img
          className="absolute inset-0 w-full h-full "
          src={banner?.link}
          alt=""
        />
        <SwiperComponent
          slidesPerView={previewNumber}
          loop={false}
          style={{
            width: "100%",
          }}
        >
          {listPost.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={clsx({
                  " animate__animated animate__fadeInUp": isInView,
                })}
                style={{
                  ["--animate-count" as string]: index,
                }}
              >
                <BannerItemImage
                  key={index}
                  data={item}
                  length={listPost.length}
                />
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>

        </SwiperSlide> */}
        </SwiperComponent>
      </div>
    </div>
  );
};
