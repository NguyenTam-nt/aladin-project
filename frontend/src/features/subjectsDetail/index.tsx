import { Banner } from "@features/abouts/components/Banner";
import ContentNews from "./components/ContentNews";
import NewsRelated from "./components/NewsRelated";
import { LinkPageHeader } from "@components/LinkPageHeader";
import { BannerType } from "@typeRules/banner";


const SubjectDetailPage = () => {


  return (
    <>
      <Banner  type={BannerType.news}></Banner>
      <LinkPageHeader />
      <div className="w-rp  justify-between items-center  pb-[41px] xl:pb-[120px]">
        <div className="flex flex-col xl:flex-row mt-[8px] xl:mt-[48px]">
          <ContentNews />
          <div className=" max-w-[424px] ml-[0px] xl:ml-[24px]">
            <NewsRelated />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectDetailPage;
