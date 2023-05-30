import React from "react";
import { BrandUniform } from "./BrandUniform";
import { useGetContent } from "@features/abouts/useGetContent";
import { ContentType } from "@typeRules/content";

const BrandPage = () => {
  const {data} = useGetContent(ContentType.brand)
  return (
    <div className="w-rp mt-[32px] mb-[41px] xl:mb-[120px]">
     {
      data.map((item, index) => {
        return <BrandUniform index={index} key={index} data={item} />
      })
     }
     
    </div>
  );
};
export default BrandPage;
