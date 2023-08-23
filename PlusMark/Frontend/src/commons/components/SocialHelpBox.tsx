import KakaoTalkIcon from "@assets/iconElements/KakaoTalkIcon";
import ZaloIcon from "@assets/iconElements/ZaloIcon";
import DynamicButton from "@components/Buttons/DynamicButton";
import React from "react";

const SocialHelpBox = () => {
  return (
    <div className="flex items-center justify-center gap-5 md:mt-16 mt-spc30">
      <DynamicButton
        text="global.kakaotalk"
        className="h-spc45 2xl:w-spc300 w-1/2 gap-3"
        iconLeft={<KakaoTalkIcon />}
        gradien={true}
        normal={false}
      />
      <DynamicButton
        text="global.zalo"
        className="h-spc45 2xl:w-spc300 w-1/2 gap-3"
        iconLeft={<ZaloIcon />}
        gradien={true}
        normal={false}
      />
    </div>
  );
};

export default SocialHelpBox;
