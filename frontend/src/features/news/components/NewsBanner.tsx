import { ImageTranslation } from "@components/ImageTranslation";
import TagNews from "@components/TagNews";
import React from "react";


export const typeColorTag = [
  "bg-bg_1D7C4D",
  "bg-bg_3062D4",
  "bg-bg_F59638",
  "bg-bg_E93A76",
];

interface INewsBannerItem {
  tagName: string;
  title: string;
  time: string;
  image: string;
}


interface INewsBanner {
  newsBanner : INewsBannerItem[]
}

const NewsBanner = ( props :INewsBanner ) => {
   const {newsBanner} = props
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-[24px] mt-[40px]">
      <div className="col-span-1 xl:col-span-2  overflow-hidden h-[435px]  relative">
        <ImageTranslation link={newsBanner[0].image} />
        <div className=" absolute w-full bottom-[0px]  left-0 mx-[24px] bg-gr_text">
          <TagNews title={newsBanner[0].tagName} color={typeColorTag[3]} />
          <p className=" text-_18 font-bold leading-[32px] text-text_white mt-[10px] line-clamp-3">
            {newsBanner[0].title}
          </p>
          <p className=" text-_14  mb-[24px] text-text_white">
            {newsBanner[0].time}
          </p>
        </div>
      </div>
      <div className="overflow-hidden h-[435px]  relative">
        <ImageTranslation link={newsBanner[1].image}></ImageTranslation>
        <div className=" absolute w-full bottom-[0px]  left-0 px-[24px] bg-gr_text">
          <TagNews title={newsBanner[1].tagName} />
          <p className=" text-_18 font-bold leading-[32px] text-text_white mt-[10px]">
            {newsBanner[1].title}
          </p>
          <p className=" text-_14  mb-[24px] text-text_white">
            {newsBanner[1].time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;
