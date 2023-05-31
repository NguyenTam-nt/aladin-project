
import { ImageTranslation } from "@components/ImageTranslation";
import React, { useContext } from "react";
import TagNews from "@components/TagNews";
import { Link } from "react-router-dom";
import { TranslateContext } from "@contexts/Translation";
import type { INews } from "@typeRules/news";
import { getDate } from "@commons/index";


const NewsItem = ({
  item,
  navigation,
}: {
  item: INews;
  navigation: string;
}) => {
  const { t, isVn } = useContext(TranslateContext);
  return (
    <Link to={`${navigation}?id=${item.id}`} className="h-[360px]  bg-bg_FAFAFA">
      <div className=" overflow-hidden h-[184px]">
        <ImageTranslation link={item.files![0].link || ""}></ImageTranslation>
      </div>
      <div className=" mx-[24px] mt-[26px]">
        <TagNews
          title={isVn ? item.newsCategory?.name : item.newsCategory?.nameKo}
        />
        <p className=" text-_18 font-bold leading-[32px] text-text_black  mt-[10px] line-clamp-2">
          {isVn ? item.title : item.titleKo}
        </p>
        <p className=" text-_14 text-text_black ">
          {t("common.create_day") + ": " + getDate(item.createdDate || "")}
        </p>
      </div>
    </Link>
  );
}; 





interface INewsList {
  newsItem : INews[]
  navigationToDetail : string 
}

const NewsList = (props: INewsList) => {
  const { newsItem ,navigationToDetail } = props;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:!grid-cols-3 gap-[24px] mt-[24px]">
        {newsItem.map((item, index) => (
          <NewsItem key={index} item={item}  navigation={navigationToDetail}></NewsItem>
        ))}
      </div>
  
    </>
  );
};






export default NewsList;
