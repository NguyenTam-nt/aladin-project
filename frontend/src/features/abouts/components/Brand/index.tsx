import React from "react";
import { BrandLogo } from "./BrandLogo";
import { BrandSong } from "./BrandSong";
import { BrandUniform } from "./BrandUniform";

const BrandPage = () => {
  return (
    <div className="w-rp mt-[32px] mb-[41px] xl:mb-[120px]">
     <BrandLogo />
     <BrandSong />
     <BrandUniform />
    </div>
  );
};
export default BrandPage;
