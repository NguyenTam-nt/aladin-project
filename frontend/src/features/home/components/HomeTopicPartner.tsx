import BannerBg from "@assets/images/home_banner_bg.png";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import { useGetBanner } from "@features/abouts/components/useGetBanner";
import { BannerType, IBanner } from "@typeRules/banner";
import { useEffect, useState } from "react";
import { bannerService } from "@services/banner";

export const HomeTopicPartner = () => {
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
      <div className="bg-bg_F8F8F8 relative h-auto flex flex-col mt-[40px] xl:mt-[140px]"  ref={ref}>
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
        <div className={clsx("w-rp-l gap-x-[32px] flex-1 mb-[24px] flex flex-wrap justify-center mt-[16px] xl:mt-[12px] gap-y-[24px]", {"animate__animated animate__fadeIn":isInView})}
          style={{
            ["--animate-count" as string]: 2
          }}
        >
            {bannerHome.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item?.link} className="h-[50px] w-[100px] md:w-[150px] object-cover md:h-[80px]" alt="" />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
