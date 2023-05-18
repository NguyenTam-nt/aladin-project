
import { ImageTranslation } from "@components/ImageTranslation";
import Pagination from "@features/news/components/Paginnation";
import React from "react";

const NewsItem = () => {
  return (
    <div className="h-[360px]  bg-bg_FAFAFA">
      <div className=" overflow-hidden h-[360px]">
        <ImageTranslation link="https://images.unsplash.com/photo-1558429121-8cebc52d40a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1954&q=80"></ImageTranslation>
      </div>
      <div className=" mx-[24px] mt-[26px]">
        <p className=" text-_12 bg-green-600 text-center font-bold text-text_white leading-[20px] px-[16px] inline-block ">
          Tag green
        </p>
        <p className=" text-_18 font-bold leading-[32px] text-text_black  mt-[10px]">
          Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam.
        </p>
        <p className=" text-_14 text-text_black ">Ngày đăng tải: 23/02/2023</p>
      </div>
    </div>
  );
}; 



const data = [1,2,3,4,5,6]


const VideoList = () => {

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] mt-[24px]">
        {data.map((_) => (
          <NewsItem></NewsItem>
        ))}
     
      </div>
      <Pagination currentPage={1} totalPages={30} />
    </>
  );
};






export default VideoList;
