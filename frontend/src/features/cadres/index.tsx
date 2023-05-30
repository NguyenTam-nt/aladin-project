import { Banner } from "@features/abouts/components/Banner";
import { HeaderTilteLink } from "@components/HeaderTilteLink";

import { LinkPageHeader } from "@components/LinkPageHeader";
import AllCadres from "./allCadres/AllCadres";
import { BannerType } from "@typeRules/banner";

const CadresPage = () => {
  return (
    <>
      <Banner type={BannerType.cadres}></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>;
      <div className="w-rp  justify-between items-center  pb-[41px] xl:pb-[120px]">
       <AllCadres />
      </div>
    </>
  );
};

export default CadresPage;
