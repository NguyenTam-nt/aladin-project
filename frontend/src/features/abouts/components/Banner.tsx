import { Button } from "@components/Button";
import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBanner } from "./useGetBanner";
import type { BannerType } from "@typeRules/banner";

export const Banner = React.memo(({type}:{type:BannerType}) => {
  const {isVn} = useContext(TranslateContext)
  const naviagtion = useNavigate()
  const {banner} = useGetBanner(type)

  const goToTrain = () => {
    naviagtion(`${paths.news.prefix}`)
  }

  return (
    <div className=" relative h-[400px]">
       <div className="absolute inset-0 banner-bg-about z-[2]"></div>
       <img className="absolute inset-0 w-full h-full" src={banner?.link} alt="" />
      <div className=" absolute inset-0 z-[4] flex flex-col justify-center items-center text-text_white">
        <Button onClick={goToTrain} color="primary" text="button._news" className="!w-[78px] flex justify-center bg-secondary !h-[28px] !py-[2px] !text-_12" />
        <h3 className=" text-[18px] xl:text-_48 font-semibold xl:font-bold  w-[70%] text-center my-[12px] line-clamp-2 animate__animated animate__fadeIn"
          style={{
            ["--animate-count" as string]: 1.5
          }}
        >{isVn ? banner?.title : banner?.titleKo}</h3>
      </div>
    </div>
  );
})


