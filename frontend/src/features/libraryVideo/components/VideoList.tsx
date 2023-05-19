
import { ImageTranslation } from "@components/ImageTranslation";
import TagNews from "@components/TagNews";
import { ModalContext } from "@contexts/ModalContext";
import Pagination from "@features/news/components/Paginnation";
import React, { useContext } from "react";
import { ButtonActionVideo } from "./ButtonActionVideo";
import ModalVideo from "./ModalVideo";

const NewsItem = () => {
  const {setElementModal} = useContext(ModalContext)

  const showModal = () => {
    setElementModal(<ModalVideo currentIndex={0} />)
  }
  return (
    <div className=" relative h-[360px]  bg-bg_FAFAFA">
      <div className="overflow-hidden h-[360px]">
        <ImageTranslation link="https://images.unsplash.com/photo-1558429121-8cebc52d40a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1954&q=80"></ImageTranslation>
      </div>
      <div className="absolute  z-5 bottom-[0px] left-0 mx-[24px] ">
       <TagNews></TagNews>
        <p className=" text-_18 font-bold leading-[32px] text-text_white mt-[10px] line-clamp-2">
          Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam. Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam.
        </p>
        <p className=" text-_14 text-text_white ">Ngày đăng tải: 23/02/2023</p>
        <div className="flex flex-row my-[24px]">
        <ButtonActionVideo onPlayNow={showModal}></ButtonActionVideo>
        </div>
      </div>
    </div>
  );
}; 



const data = [1,2,3,4]


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
