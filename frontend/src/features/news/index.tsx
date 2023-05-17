import { HeaderTilteLink } from "@components/HeaderTilteLink";
import NewsBanner from "./components/NewsBanner";
import NewsList from "./components/NewsList";
import { Outlet } from "react-router-dom";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";

const NewsPage = () => {
  
  return (
    <>
       <Banner></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>
      <Outlet></Outlet>
    </>
  );
};

export default NewsPage;
