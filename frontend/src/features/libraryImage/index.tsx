import { HeaderTilteLink } from "@components/HeaderTilteLink";
import React from "react";
import ImagesList from "./components/ImageList";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";

const LibraryImage = () => {
  return (
    <div>
      <Banner></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>
      <ImagesList></ImagesList>
    </div>
  );
};

export default LibraryImage;