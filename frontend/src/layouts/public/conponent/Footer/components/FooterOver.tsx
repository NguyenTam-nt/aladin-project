import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICInstagram } from "@assets/icons/ICInstagram";
import { ICTwiter } from "@assets/icons/ICTwiter";
import { ICYoutube } from "@assets/icons/ICYoutube";
import React from "react";

export const FooterOver = () => {


  return (
    <div className="w-rp  text-[14px]">
      <div className="py-[24px] gap-y-[16px]  flex flex-col lg:flex-col-reverse m992:flex-row justify-between lg:items-center border-t-[1px] border-text_white border-solid ">
        <span className="text-text_white lg:text-center m992:text-left mt-[24px] m992:mt-0">
           Giang Mỹ Hotpot, Copyright @2023 - Design by Aladin Technology Company
        </span>
        <div className="flex lg:items-center gap-x-[16px]"> 
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
