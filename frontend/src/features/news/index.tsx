import { HeaderTilteLink } from "@components/HeaderTilteLink";
import NewsBanner from "./components/NewsBanner";
import NewsList from "./components/NewsList";

const NewsPage = (data : any) => {
  return (
    <>
    <HeaderTilteLink></HeaderTilteLink>
    <div className="w-rp  justify-between items-center mb-[120px] ">
     <NewsBanner/>
     <NewsList/>
    </div>
    </>
  );
};

export default NewsPage;
