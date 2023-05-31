import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import AllNews from "./allNews";
import { BannerType } from "@typeRules/banner";
import { useContext, useEffect, useState } from "react";
import { newsService } from "@services/newsService";
import { useLocation, useSearchParams } from "react-router-dom";
import { HeaderTilteCustom, PropsHeader } from "@components/HeaderTilteCustom";
import { TranslateContext } from "@contexts/Translation";

const NewsPage = () => {
 const params = useLocation();
  const [headerItem , setHeaderItem ] = useState<any>([])
  const { t } =  useContext(TranslateContext)

  useEffect(() => {
    newsService.getParent().then((parent) => {

      const newParent = parent.data.map((item) => {
        return { path: item.id, ...item };
      });
      setHeaderItem(newParent)
    });
  }, []);


  return (
    <>
      <Banner  type={BannerType.news}></Banner>
      <LinkPageHeader />
      <HeaderTilteCustom  isQuery   prefix={params.pathname.split("/")[1]} title={t("news.header.title")} listLink={headerItem} ></HeaderTilteCustom>
      <AllNews />
    </>
  );
};

export default NewsPage;
