import { Banner } from "@features/abouts/components/Banner";
import CadresList from "./components/CadresList";
import { HeaderTilteLink } from "@components/HeaderTilteLink";

const CadresPage = () => {
  return (
    <>
       <Banner></Banner>
      <HeaderTilteLink></HeaderTilteLink>;
      <div className="w-rp  justify-between items-center  pb-[41px] xl:pb-[120px]">
        <CadresList></CadresList>
      </div>
    </>
  );
};

export default CadresPage;
