import BannerBg from "@assets/images/home_banner_bg.png";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import useWindowResize from "@hooks/useWindowResize";
import { withResponsive } from "@constants/container";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import { useGetBanner } from "@features/abouts/components/useGetBanner";
import { BannerType, IBanner } from "@typeRules/banner";
import { useEffect, useState } from "react";
import { bannerService } from "@services/banner";

export const HomeTopicPartner = () => {
  const { width } = useWindowResize();
  const {ref, isInView} = useInView()
  const {banner} = useGetBanner(BannerType.bannerParter)
  const [bannerHome, setBannerHome] = useState<IBanner[]>([]);
  useEffect(() => {
    bannerService.getByType(BannerType.bannerLogoParter).then((data) => {
      setBannerHome(data?.data);
    });
  }, []);
  return (
    <>
      <div className="bg-bg_F8F8F8 relative h-[157px] xl:h-[422px] flex flex-col mt-[40px] xl:mt-[140px]"  ref={ref}>
        <div className={clsx("w-rp", {"animate__animated animate__fadeInUp": isInView})}>
          <img
            className={clsx("w-full h-[73px] xl:h-[283px] object-cover translate-y-[-50%]")}
            src={banner?.link}
            alt=""
          />
        </div>
        <img
          className="w-full absolute object-cover bottom-0"
          src={BannerBg}
          alt=""
        />
        <div className={clsx("w-rp-l gap-x-[72px] mt-[16px] xl:mt-[12px] gap-y-[24px]", {"animate__animated animate__fadeIn":isInView})}
          style={{
            ["--animate-count" as string]: 2
          }}
        >
          <SwiperComponent
            slidesPerView={width > withResponsive._1280 ? 7 : width > withResponsive._768 ? 5 : 3}
            spaceBetween={24}
          >
            {bannerHome.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item?.link} className=" h-[48px] xl:h-auto" alt="" />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
        </div>
      </div>
    </>
  );
};
