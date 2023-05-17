import React from "react";
import { Banner } from "@features/abouts/components/Banner";
import { HeaderTilteLink } from "@components/HeaderTilteLink";
import NewsBanner from "@features/news/components/NewsBanner";
import NewsList from "@features/news/components/NewsList";
import { LinkPageHeader } from "@components/LinkPageHeader";

const LibraryVideo = () => {
  return (
    <div>
      <Banner></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>
      <div className="w-rp  justify-between items-center mb-[120px] ">
        <NewsBanner />
        <NewsList />
      </div>
    </div>
  );
};

export default LibraryVideo;