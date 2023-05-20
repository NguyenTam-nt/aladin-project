import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import AllNotice from "./allNotice";

const NoticePage = () => {
  return (
    <>
      <Banner></Banner>
      <LinkPageHeader  />
      <HeaderTilteLink></HeaderTilteLink>
      <AllNotice />
    </>
  );
};

export default  NoticePage;
