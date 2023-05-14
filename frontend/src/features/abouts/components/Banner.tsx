import { Button } from "@components/Button";
import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";
import { BannerSlider } from "./BannerSlider";

export const Banner = () => {
  const {t} = useContext(TranslateContext)

  return (
    <div className=" relative">
       <div className="absolute inset-0 banner-bg-about z-[2]"></div>
        <BannerSlider />
      <div className="absolute inset-0 z-[4] flex flex-col justify-center items-center text-text_white">
        <Button color="primary" text="button._train" className="!w-[78px] flex justify-center bg-secondary !h-[28px] !py-[2px] !text-_12" />
        <h3 className=" text-[18px] xl:text-_48 font-semibold xl:font-bold  w-[70%] text-center my-[12px] line-clamp-2">Adipiscing tortor donec massa eget duis libero tortor donec venenatis et.</h3>
        <p className=" text-_14 xl:text-_16 font-semibold">{t("common.create_day")}: 25/03/2023</p>
      </div>
    </div>
  );
};


