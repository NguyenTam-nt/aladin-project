import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import AllDocument from "./allDocument";
import { BannerType } from "@typeRules/banner";

const DocumentPage = () => {
  return (
    <>
      <Banner  type={BannerType.file_document}></Banner>
      <LinkPageHeader  />
      <HeaderTilteLink></HeaderTilteLink>
      <AllDocument />
    </>
  );
};

export default  DocumentPage;
