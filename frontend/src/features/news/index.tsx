import NewsBanner from "./components/NewsBanner";
import NewsHeader from "./components/NewsHeader"
import NewsList from "./components/NewsList";


const NewsPage = () => {
  return (
    <div className="w-rp  justify-between items-center mb-[120px] ">
     <NewsHeader/>
     <NewsBanner/>
     <NewsList/>
    </div>
  );
};

export default NewsPage;
