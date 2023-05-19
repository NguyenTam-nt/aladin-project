import { Button } from "@components/Button";
import { ImageTranslation } from "@components/ImageTranslation";
import { TranslateContext } from "@contexts/Translation";
import { BannerSlider } from "@features/abouts/components/BannerSlider";
import React, { useContext } from "react";
import { BannerVideoSlider } from "./BannerSlider";
import TagNews from "@components/TagNews";
import { ButtonActionVideo } from "./ButtonActionVideo";

const bannerItem = [
  {
    tagName: "Tag green",
    title: `  Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam.
     Tortor velit orci a mi ac nibh.Nulla ullamcorper volutpat proin
     integer nisi ullamcorper ut diam. Tortor velit orci.`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg",
  },
  {
    tagName: "Tag green",
    title: `Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam.`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://camerabox.vn/uploads/news/2018_07/chup-anh-phong-canh-thu-vi.jpg",
  },
];

const VideoBanner = () => {
  const {t} = useContext(TranslateContext)
  return (
    <div className=" relative">
      <div className="absolute inset-0 banner-bg-about z-[2]"></div>
      <BannerVideoSlider />
      <div className="absolute  bottom-[54px] left-[48px] z-[4]  w-[70%] text-text_white">
      <TagNews ></TagNews>
        <h3 className=" text-[18px] xl:text-_48 font-semibold xl:font-bold   my-[12px] line-clamp-1">
        Adipiscing tortor donec massa eget duis libero tortor donec venenatis
          et.
        </h3>
        <p className=" text-_14 xl:text-_16 font-semibold">
          {t("common.create_day")}: 25/03/2023
        </p>
        <div className="flex flex-row mt-[38px]">
         <ButtonActionVideo></ButtonActionVideo>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
