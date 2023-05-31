import { HeaderTilteLink } from "@components/HeaderTilteLink";
import React, { useContext, useEffect, useState } from "react";
import ImagesList from "./components/ImageList";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import { BannerType } from "@typeRules/banner";
import { useLocation, useNavigate } from "react-router-dom";
import type { IGallery } from "@typeRules/gallery";
import { TranslateContext } from "@contexts/Translation";
import { galleryService } from "@services/gallery";
import { HeaderTilteCustom } from "@components/HeaderTilteCustom";
import { paths } from "@constants/router";

const LibraryImage = () => {
  const navigatonToDetail =  `${paths.library_image.prefix}` 
  const [category , setCategory] = useState<IGallery[]>([])
  const params = useLocation();
  const { t } =  useContext(TranslateContext)
  const navigate = useNavigate()
  
  useEffect(() => {
 
    galleryService.getImage().then((category) => {
      const newParent = category.data.map((item) => {
        return { path: item.id, parent : "1" , ...item , };
      });
      setCategory(newParent);
      navigate(navigatonToDetail + `?id=${newParent?.[0].id}`)
    });
  }, []);

  return (
    <div>
      <Banner  type={BannerType.library_image}></Banner>
      <LinkPageHeader />
      <HeaderTilteCustom
        isQuery
        prefix={params.pathname.split("/")[1]}
        title={t("home.header.navigation.library_image")}
        listLink={category}
        isChildren={true}
      ></HeaderTilteCustom>
      <ImagesList></ImagesList>
    </div>
  );
};

export default LibraryImage;