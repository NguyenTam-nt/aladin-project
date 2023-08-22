import React from "react";
import SlideProductPaginate from "./SlideProductPaginate";

const ProductSpecial = () => {
  return (
    <div className="relative min-h-spc400">
      <div className="h-[390px] bg-footer absolute top-0 w-full z-0"></div>
      <div className="py-5">
        <SlideProductPaginate />
      </div>
    </div>
  );
};

export default ProductSpecial;
