import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICInstagram } from "@assets/icons/ICInstagram";
import { ICTwiter } from "@assets/icons/ICTwiter";
import { ICYoutube } from "@assets/icons/ICYoutube";
import React from "react";

export const FooterOver = () => {


  return (
    <div className=" bg-secondary  text-[14px]">
      <div className="py-[24px]  w-rp flex flex-col-reverse m992:flex-row justify-between items-center xl:border-t-[1px] xl:border-text_white xl:border-solid ">
        <span className="text-text_white text-center m992:text-left mt-[24px] m992:mt-0">
           Giang Mỹ Hotpot, Copyright @2023 - Design by Aladin Technology Company
        </span>
        <div className="flex items-center gap-x-[16px]"> 
          <div className="w-[24px] flex items-center justify-center h-[24px] rounded-[50%] bg-white">
            <ICFacebook />
          </div>
          <div className="w-[24px] flex items-center justify-center h-[24px] rounded-[50%] bg-white">
            <ICTwiter />
          </div>
          <div className="w-[24px] flex items-center justify-center h-[24px] rounded-[50%] bg-white">
            <ICYoutube />
          </div>
          <div className="w-[24px] flex items-center justify-center h-[24px] rounded-[50%] bg-white">
            <ICInstagram />
          </div>
         
        </div>

      </div>
    </div>
  );
};
