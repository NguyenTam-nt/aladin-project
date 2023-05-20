import { HeaderTilteLink } from "@components/HeaderTilteLink";
import { Banner } from "@features/abouts/components/Banner";
import { LinkPageHeader } from "@components/LinkPageHeader";
import AllDocument from "./allDocument";

const DocumentPage = () => {
  return (
    <>
      <Banner></Banner>
      <LinkPageHeader  />
      <HeaderTilteLink></HeaderTilteLink>
      <AllDocument />
    </>
  );
};

export default  DocumentPage;
