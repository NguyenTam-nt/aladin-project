import BannerProposal from "@assets/images/home_banner_proposal.png";
import BannerBg from "@assets/images/home_banner_bg.png";
import Company1 from "@assets/images/Company1.png";
import Company2 from "@assets/images/Company2.png";
import Company3 from "@assets/images/Company3.png";
import Company4 from "@assets/images/Company4.jpg";
import Company5 from "@assets/images/Company5.jpg";
import Company6 from "@assets/images/Company6.jpg";
import Company7 from "@assets/images/Company7.jpg";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import useWindowResize from "@hooks/useWindowResize";
import { withResponsive } from "@constants/container";
import useInView from "@hooks/useInView";
import clsx from "clsx";

const data = [
  Company1,
  Company2,
  Company3,
  Company4,
  Company5,
  Company6,
  Company7,
]

export const HomeTopicPartner = () => {
  const { width } = useWindowResize();
  const {ref, isInView} = useInView()
  return (
    <>
      <div className="bg-bg_F8F8F8 relative h-[157px] xl:h-[422px] flex flex-col mt-[40px] xl:mt-[140px]"  ref={ref}>
        <div className={clsx("w-rp", {"animate__animated animate__fadeInUp": isInView})}>
          <img
            className={clsx("w-full h-[73px] xl:h-[283px] object-cover translate-y-[-50%]")}
            src={BannerProposal}
            alt=""
          />
        </div>
        <img
          className="w-full absolute object-cover bottom-0"
          src={BannerBg}
          alt=""
        />
        <div className={clsx("w-rp-l gap-x-[72px] mt-[30px] gap-y-[24px]", {"animate__animated animate__fadeIn":isInView})}
          style={{
            ["--animate-count" as string]: 2
          }}
        >
          <SwiperComponent
            slidesPerView={width > withResponsive._1280 ? 7 : width > withResponsive._768 ? 5 : 3}
            spaceBetween={24}
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item} alt="" />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
        </div>
      </div>
    </>
  );
};
