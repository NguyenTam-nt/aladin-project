import React from "react";
import { Banner } from "@features/abouts/components/Banner";
import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { LinkPageHeader } from "@components/LinkPageHeader";
import VideoBanner from "./components/VideoBanner";
import VideoList from "./components/VideoList";
import { BannerType } from "@typeRules/banner";

const LibraryVideo = () => {
  return (
    <div>
      <Banner  type={BannerType.library_video}></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>
      <div className="w-rp  justify-between items-center mb-[120px] mt-[70px] ">
        <VideoBanner></VideoBanner>
        <VideoList></VideoList>
      </div>
    </div>
  );
};

export default LibraryVideo;