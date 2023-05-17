import { HeaderTilteLink } from "@components/HeaderTilteLink";
import React from "react";
import ImagesList from "./components/ImageList";
import { Banner } from "@features/abouts/components/Banner";

const LibraryImage = () => {
  return (
    <div>
      <Banner></Banner>
      <HeaderTilteLink></HeaderTilteLink>
      <ImagesList></ImagesList>
    </div>
  );
};

export default LibraryImage;