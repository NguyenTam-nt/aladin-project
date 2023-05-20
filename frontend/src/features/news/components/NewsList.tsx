
import { ImageTranslation } from "@components/ImageTranslation";
import React from "react";
import Pagination from "./Paginnation";
import TagNews from "@components/TagNews";
import { Link } from "react-router-dom";
import { paths } from "@constants/router";




const NewsItem = ({ item  , navigation  }: { item: INewsItem  , navigation : string}) => {
  const { tagName, title, time, image ,  } = item;
  return (
    <Link to={`${navigation}?id=1`} className="h-[360px]  bg-bg_FAFAFA">
      <div className=" overflow-hidden h-[184px]">
        <ImageTranslation link={image}></ImageTranslation>
      </div>
      <div className=" mx-[24px] mt-[26px]">
        <TagNews title={tagName} />

        <p className=" text-_18 font-bold leading-[32px] text-text_black  mt-[10px] line-clamp-2">
          {title}
        </p>

        <p className=" text-_14 text-text_black "> {time}</p>
      </div>
    </Link>
  );
}; 


interface INewsItem {
  tagName: string;
  title: string;
  time: string;
  image: string;
}


interface INewsList {
  newsItem : INewsItem[]
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
      <Pagination currentPage={1} totalPages={30} />
    </>
  );
};






export default NewsList;
