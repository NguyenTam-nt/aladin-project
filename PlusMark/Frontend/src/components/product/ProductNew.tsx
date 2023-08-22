import TitleSession from "@components/common/TitleSession";
import React from "react";
import SlideProducts from "./SlideProducts";

const ProductNew = () => {
  return (
    <div className="product_box relative py-10">
      <TitleSession text="text.section.new" className="w-full mb-6" />
      <SlideProducts typeSlide="new" />
    </div>
  );
};

export default ProductNew;
