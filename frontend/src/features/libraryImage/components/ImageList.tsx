import { ImageTranslation } from "@components/ImageTranslation";
import { ModalContext } from "@contexts/ModalContext";
import React, { useContext, useEffect, useState } from "react";
import ModalImage from "./ModalImage";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import type { IFileGalleryValue, IGalleryImage } from "@typeRules/gallery";
import { galleryService } from "@services/gallery";
import { TranslateContext } from "@contexts/Translation";
import bgImage from "@assets/images/backgroudImage.png";


interface ImageItemProp {
  item : IFileGalleryValue ,
  index : number , 
  imageList : string[]
} 

const ImageItem = ({item , index  ,imageList}: ImageItemProp) => {

  
  const {setElementModal} = useContext(ModalContext)
  const showModal = () => {
    setElementModal(<ModalImage currentIndex={index} imageList={imageList} />)
  }
  const {ref, isInView} = useInView()
  return (
    <div className="xl:max-h-[461px]  bg-bg_FAFAFA " onClick={showModal}>
      <div ref={ref} className={clsx("pics overflow-hidden  max-h-[468px] xl:max-h-[461px] relative", {"animate__animated animate__fadeInUp": isInView})}>
        <ImageTranslation link={item.link || "http://avpsi.com.vn/static/img/default.jpg"}></ImageTranslation>
      </div>
    </div>
  );
};

const ImagesList = () => {
  const [searchParam] = useSearchParams();
  const [data , setData] = useState<IGalleryImage>()
  const { isVn} = useContext(TranslateContext)
  // const [currentPage , setCurrentPage] = useState(1)
  // const [totalPages , setTotalPages] = useState(0)
  
  const getNewsList = (page: number, id?: string) => {
    if (id) {
      galleryService.getAlbumbyId(id, { page: page, size: 8 }).then((news) => {
        setData(news);
        // setTotalPages(Math.ceil(news.files.totalPages));
      });
    } 
  };
 
  const onChangePage = (page: number) => {
    // setCurrentPage(page);
    if (searchParam.get("id")) {
      getNewsList(page - 1, searchParam.get("id") || "0");
      return;
    }
    getNewsList(page - 1);
  };
 
  useEffect(() => {
    onChangePage(1);
  }, [searchParam]);

  return (
    <div className="flex w-rp  pb-[41px] xl:pb-[120px]  mt-[32px] xl:mt-[70px]">
      <div className="gallery">
        <div className="flex  relative h-[461px] w-[311px] bg-bg_272E35 items-center mb-[12px] ">
          <img src={bgImage}   className="w-full  object-cover h-full" /> 
          <div className="mx-[24px] absolute top-[40%] left-0 z-10">
            <p className="text-text_white text-_18 font-bold line-clamp-1">
              {isVn ? data?.name : data?.nameKo}
            </p>
            <p className="text-text_white text-_14 mt-[8px] line-clamp-3">
              {isVn ? data?.des : data?.desKo}
            </p>
          </div>
        </div>
        {data?.files?.content?.map((item, index) => (
          <ImageItem index={index} key={index} item={item} imageList={[...data.files.content.map(file => file.link || "")]}></ImageItem>
        ))}
      </div>
    </div>
  );
};

export default ImagesList;
