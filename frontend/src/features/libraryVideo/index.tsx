import React, { useEffect, useState } from "react";
import { Banner } from "@features/abouts/components/Banner";
import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { LinkPageHeader } from "@components/LinkPageHeader";
import VideoBanner from "./components/VideoBanner";
import VideoList from "./components/VideoList";
import { BannerType } from "@typeRules/banner";
import type { IGallery } from "@typeRules/gallery";
import { galleryService } from "@services/gallery";

const LibraryVideo = () => {

  const [bannerItem , setBannerItem] = useState<IGallery[]>([])
  const [data , setData] = useState<IGallery[]>([])
  const [currentPage , setCurrentPage] = useState(1)
  const [totalPages , setTotalPages] = useState(0)


  
  
  const getNewsList = (page: number) => {
    galleryService.getVideo({ page: page, size: 7 }).then((news) => {
      if (news.data.length >= 3) {
        setBannerItem(news.data.slice(0, 3));
        setData(news.data.slice(3));
      } else {
        setBannerItem([]);
        setData(news.data);
      }
      setTotalPages(Math.ceil(news.total / 7));
    });
 
  };


  const onChangePage = (page: number) => {
    getNewsList(page - 1);
    setCurrentPage(page)
  };
 
  useEffect(() => {
    onChangePage(1);
  }, []);



  return (
    <div>
      <Banner  type={BannerType.library_video}></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>
      <div className="w-rp  justify-between items-center mb-[120px] mt-[70px] ">
        <VideoBanner bannerItem={bannerItem}></VideoBanner>
        <VideoList data={data} currentPage={currentPage} setCurrentPage={onChangePage} totalPages={totalPages} ></VideoList>
      </div>
    </div>
  );
};

export default LibraryVideo;