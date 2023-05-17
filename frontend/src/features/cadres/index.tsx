import { Banner } from "@features/abouts/components/Banner";
import { HeaderTilteLink } from "@components/HeaderTilteLink";

import { LinkPageHeader } from "@components/LinkPageHeader";
import CadresList from "./components/CadresList";
import { Outlet } from "react-router-dom";

const CadresPage = () => {
  return (
    <>
      <Banner></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>;
      <div className="w-rp  justify-between items-center  pb-[41px] xl:pb-[120px]">
       <Outlet></Outlet>
      </div>
    </>
  );
};

export default CadresPage;
