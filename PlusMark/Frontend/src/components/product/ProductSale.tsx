import TitleSession from "@components/common/TitleSession";
import React, { memo } from "react";
import SlideProducts from "./SlideProducts";
import DynamicButton from "@components/Buttons/DynamicButton";
import KakaoTalkIcon from "@assets/iconElements/KakaoTalkIcon";
import ZaloIcon from "@assets/iconElements/ZaloIcon";
import SocialHelpBox from "commons/components/SocialHelpBox";

interface Props {
  isBtn?: boolean;
}
const ProductSale = memo(({ isBtn = true }: Props) => {
  return (
    <div className="product_box xl:py-14 py-10">
      <TitleSession
        text="text.section.sale"
        isBox={true}
        className="w-full mb-6"
      />
      <SlideProducts typeSlide="new" row={2} size={4} />
      {isBtn && <SocialHelpBox />}
    </div>
  );
});

export default ProductSale;
