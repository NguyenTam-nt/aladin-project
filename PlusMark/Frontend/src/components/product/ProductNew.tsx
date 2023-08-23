import TitleSession from "@components/common/TitleSession";
import React, { memo } from "react";
import SlideProducts from "./SlideProducts";
import SocialHelpBox from "commons/components/SocialHelpBox";
interface Props {
  isBtn?: boolean;
}
const ProductNew = memo(({ isBtn = false }: Props) => {
  return (
    <div className="product_box relative py-10">
      <TitleSession text="text.section.new" className="w-full mb-6" />
      <SlideProducts typeSlide="new" />
      {isBtn && <SocialHelpBox />}
    </div>
  );
});

export default ProductNew;
