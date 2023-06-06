import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import AllDocument from "./allDocument";
import { BannerType } from "@typeRules/banner";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { TranslateContext } from "@contexts/Translation";
import { HeaderTilteCustom } from "@components/HeaderTilteCustom";

const DocumentPage = () => {
  const params = useLocation();
  const [headerItem ] = useState<any>([])
  const { t } =  useContext(TranslateContext)

  // useEffect(() => {
  //   newsService.gewNewCategory({ } , "" , "9301").then((parent) => {

  //     // setHeaderItem(newParent);
  //   });
  // }, []);
  return (
    <>
      <Banner  type={BannerType.file_document}></Banner>
      <LinkPageHeader />
      <HeaderTilteCustom
        isQuery
        prefix={params.pathname.split("/")[1]}
        title={t("news.header.title")}
        listLink={headerItem}/>
      <AllDocument />
    </>
  );
};

export default  DocumentPage;
