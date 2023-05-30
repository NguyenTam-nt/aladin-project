import { Banner } from "@features/abouts/components/Banner";
import { HeaderTilteLink } from "@components/HeaderTilteLink";

import { LinkPageHeader } from "@components/LinkPageHeader";

import { Outlet } from "react-router-dom";
import { BannerType } from "@typeRules/banner";

const SubjectPage = () => {
  return (
    <>
      <Banner  type={BannerType.subject}></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>;
      <div className="w-rp  justify-between items-center  pb-[41px] xl:pb-[120px]">
       <Outlet></Outlet>
      </div>
    </>
  );
};

export default SubjectPage;
