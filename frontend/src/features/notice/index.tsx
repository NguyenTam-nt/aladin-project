import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { Outlet } from "react-router-dom";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";

const NoticePage = () => {
  return (
    <>
      <Banner></Banner>
      <LinkPageHeader  />
      <HeaderTilteLink></HeaderTilteLink>
      <Outlet></Outlet>
    </>
  );
};

export default  NoticePage;
