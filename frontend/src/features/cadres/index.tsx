import { Banner } from "@features/abouts/components/Banner";

import { LinkPageHeader } from "@components/LinkPageHeader";
import AllCadres from "./allCadres/AllCadres";
import { BannerType } from "@typeRules/banner";
import { useContext, useEffect, useState } from "react";
import { cadresService } from "@services/cadres";
import type { ICategotiesCadres } from "@typeRules/cadres";
import { HeaderTilteCustom } from "@components/HeaderTilteCustom";
import { useLocation } from "react-router-dom";
import { TranslateContext } from "@contexts/Translation";

const CadresPage = () => {
  const [category , setCategory] = useState<ICategotiesCadres[]>([])
  const params = useLocation();
  const { t } =  useContext(TranslateContext)
  useEffect(() => {
     cadresService.getCadresCategories().then((category) => {
      const newParent = category.data.map((item) => {
        return { path: item.id, ...item };
      });
      setCategory(newParent)
     } )
  } , [])

  return (
    <>
      <Banner type={BannerType.cadres}></Banner>
      <LinkPageHeader />
      <HeaderTilteCustom
        isQuery
        prefix={params.pathname.split("/")[1]}
        title={t("home.header.navigation.cadres")}
        listLink={category}
      ></HeaderTilteCustom>
      <div className="w-rp  justify-between items-center  pb-[41px] xl:pb-[120px]">
        <AllCadres />
      </div>
    </>
  );
};

export default CadresPage;
