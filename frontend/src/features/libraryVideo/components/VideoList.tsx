
import TagNews from "@components/TagNews";
import { ModalContext } from "@contexts/ModalContext";
import Pagination from "@features/news/components/Paginnation";
import React, { useContext } from "react";
import { ButtonActionVideo } from "./ButtonActionVideo";
import ModalVideo from "./ModalVideo";
import { TranslateContext } from "@contexts/Translation";
import type { IGallery } from "@typeRules/gallery";
import { getDate } from "@commons/index";

interface NewsItemProps {
data : IGallery
totalList : IGallery[]
index : number
}

const NewsItem = ({data ,totalList ,index} :NewsItemProps ) => {
  

  const {setElementModal} = useContext(ModalContext)
  const { t , isVn} = useContext(TranslateContext)

  const showModal = () => {
    setElementModal(<ModalVideo currentIndex={index}   bannerItem={totalList} />)
  }
  return (
    <div className=" relative h-[360px]  bg-bg_FAFAFA">
      <div className="overflow-hidden h-[360px]">
        <video className="w-full h-full" src={data?.files?.[0]?.link}></video>
      </div>
      <div className="absolute w-full  z-5 bottom-[0px] left-0   bg-gr_text ">
        <div className="mx-[24px]">
       <TagNews></TagNews>
        <p className=" text-_18 font-bold leading-[32px] text-text_white mt-[10px] line-clamp-2">
          { isVn ? data.name : data.nameKo}
        </p>
        <p className=" text-_14 text-text_white ">  {t("common.create_day") + ":" + getDate(data.createdDate)}</p>
        <div className="flex flex-row my-[24px]">
        <ButtonActionVideo onPlayNow={showModal}></ButtonActionVideo>
        </div>
        </div>
      </div>
    </div>
  );
}; 





interface VideoListProps {
  data: IGallery[];
  currentPage: number;
  setCurrentPage: (index: number) => void;
  totalPages: number;
}


const VideoList = (props: VideoListProps) => {
  const { data, currentPage, setCurrentPage, totalPages } = props;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-[24px]">
        {data.map((item , index) => (
          <NewsItem key={item.id} index={index}  data={item} totalList={data}></NewsItem>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};






export default VideoList;
