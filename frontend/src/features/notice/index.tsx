import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import AllNotice from "./allNotice";
import { BannerType } from "@typeRules/banner";

const NoticePage = () => {
  return (
    <>
      <Banner  type={BannerType.notice}></Banner>
      <LinkPageHeader  />
      <HeaderTilteLink></HeaderTilteLink>
      <AllNotice />
    </>
  );
};

export default  NoticePage;
