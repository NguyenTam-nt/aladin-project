import TitleSession from "@components/common/TitleSession";
import SocialHelpBox from "commons/components/SocialHelpBox";
import { memo } from "react";
import SlideProducts from "./SlideProducts";

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
