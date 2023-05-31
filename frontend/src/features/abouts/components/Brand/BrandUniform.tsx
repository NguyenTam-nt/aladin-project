import React from "react";
import { GeneralDetail } from "../general/GeneralDetail";
import type { IContent } from "@typeRules/content";

export const BrandUniform = ({data, index}:{data:IContent, index:number}) => {
  return (
    <div className="mt-[32px]">
      <GeneralDetail index={index} data={data} />
      <div className="mt-[24px] flex justify-center flex-wrap gap-[24px] h-auto">
          {
        data.files?.length && data.files?.map((item, index) => {
            return (
              <div key={index} className="h-full">
              <img
                className="w-auto max-h-[342px]"
                src={item.link}
                alt=""
              />
            </div>
            )
            })
          }
       
        {/* <div className="h-full mt-[24px] md:mt-0">
          <img
            className="w-full max-h-[342px] object-cover"
            src={BrandIniForm1}
            alt=""
          />
        </div> */}
      </div>
    </div>
  );
};
