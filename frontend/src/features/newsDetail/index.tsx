import ContentNews from "./components/ContentNews";
import NewsRelated from "./components/NewsRelated";

const NewsDetailPage = () => {
  return (
    <div className="w-rp  justify-between items-center  pb-[120px]">
      <div className="flex flex-row mt-[48px]">
        <ContentNews/>
        <div className="w-[424px] ml-[24px]">
          <NewsRelated/>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
