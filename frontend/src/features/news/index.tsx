import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import AllNews from "./allNews";
import { BannerType } from "@typeRules/banner";

const NewsPage = () => {
  return (
    <>
      <Banner  type={BannerType.news}></Banner>
      <LinkPageHeader />
      <HeaderTilteLink></HeaderTilteLink>
      <AllNews />
    </>
  );
};

export default NewsPage;
