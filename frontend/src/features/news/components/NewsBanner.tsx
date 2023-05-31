import { getDate } from "@commons/index";
import { ImageTranslation } from "@components/ImageTranslation";
import TagNews from "@components/TagNews";
import { TranslateContext } from "@contexts/Translation";
import type { INews } from "@typeRules/news";
import React, { useContext } from "react";
import { Link } from "react-router-dom";


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
  newsBanner : INews[] ,
  navigationToDetail : string 
}

const NewsBanner = ( props :INewsBanner ) => {
   const {newsBanner ,navigationToDetail} = props
   const { t , isVn } = useContext(TranslateContext);
  
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mt-[40px]">
      <Link
        to={`${navigationToDetail}?id=${newsBanner[0].id}`}
        className="col-span-1 md:col-span-2 overflow-hidden h-[435px]  relative"
      >
        <ImageTranslation link={newsBanner?.[0]?.files![0].link || ""} />
        <div className="absolute w-full bottom-[0px]  left-0 bg-gr_text">
          <div className="mx-[24px]">
            <TagNews
              title={
                isVn
                  ? newsBanner?.[0]?.newsCategory?.name
                  : newsBanner?.[0]?.newsCategory?.nameKo
              }
              color={typeColorTag[3]}
            />
            <p className=" text-_18 font-bold leading-[32px] text-text_white mt-[10px] line-clamp-3">
              {isVn ? newsBanner?.[0]?.title : newsBanner?.[0]?.titleKo}
            </p>
            <p className=" text-_14  mb-[24px] text-text_white">
              {t("common.create_day") +
                ": " +
                getDate(newsBanner?.[0]?.createdDate || "")}
            </p>
          </div>
        </div>
      </Link>
      <Link
        to={`${navigationToDetail}?id=${newsBanner[1].id}`}
        className="overflow-hidden h-[435px]  relative"
      >
        <ImageTranslation
          link={newsBanner?.[1]?.files![0].link || ""}
        ></ImageTranslation>
        <div className=" absolute w-full bottom-[0px]  left-0 px-[24px] bg-gr_text">
          <TagNews
            title={
              isVn
                ? newsBanner?.[1]?.newsCategory?.name
                : newsBanner?.[1]?.newsCategory?.nameKo || ""
            }
          />
          <br></br>
          <p className="text-_18 font-bold leading-[32px] text-text_white mt-[10px]">
            { isVn ? newsBanner?.[1]?.title : newsBanner?.[1]?.titleKo}
          </p>
          <p className=" text-_14  mb-[24px] text-text_white">
            {t("common.create_day") +
              ": " +
              getDate(newsBanner?.[1]?.createdDate || "")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default NewsBanner;
