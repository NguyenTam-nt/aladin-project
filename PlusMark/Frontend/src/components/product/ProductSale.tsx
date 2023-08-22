import TitleSession from "@components/common/TitleSession";
import React from "react";
import SlideProducts from "./SlideProducts";
import DynamicButton from "@components/Buttons/DynamicButton";
import KakaoTalkIcon from "@assets/iconElements/KakaoTalkIcon";
import ZaloIcon from "@assets/iconElements/ZaloIcon";

const ProductSale = () => {
  return (
    <div className="product_box xl:py-14 py-10">
      <TitleSession
        text="text.section.sale"
        isBox={true}
        className="w-full mb-6"
      />
      <SlideProducts typeSlide="new" row={2} size={4} />
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
    </div>
  );
};

export default ProductSale;
