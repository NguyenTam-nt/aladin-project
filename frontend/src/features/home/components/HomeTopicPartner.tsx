import BannerProposal from "@assets/images/home_banner_proposal.png";
import BannerBg from "@assets/images/home_banner_bg.png";
import LogoPartner from "@assets/images/logo_partner.png";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import useWindowResize from "@hooks/useWindowResize";
import { withResponsive } from "@constants/container";

export const HomeTopicPartner = () => {
  const { width } = useWindowResize();
  return (
    <>
      <div className="bg-bg_F8F8F8 relative h-[157px] xl:h-[422px] flex flex-col mt-[40px] xl:mt-[140px]">
        <div className="w-rp">
          <img
            className="w-full h-[73px] xl:h-[283px] object-cover translate-y-[-50%]"
            src={BannerProposal}
            alt=""
          />
        </div>
        <img
          className="w-full absolute object-cover bottom-0"
          src={BannerBg}
          alt=""
        />

        <div className="w-rp-l gap-x-[72px] mt-[30px] gap-y-[24px]">
          <SwiperComponent
            slidesPerView={width > withResponsive._1280 ? 7 : width > withResponsive._768 ? 5 : 3}
            spaceBetween={24}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={LogoPartner} alt="" />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
        </div>
      </div>
    </>
  );
};
