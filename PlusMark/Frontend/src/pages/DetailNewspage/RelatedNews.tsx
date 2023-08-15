import RelatedNewsItem from "@components/News/Item/RelatedNewsItem";
import { News, newsData } from "@pages/Newspage/Banner";
import NewsServices from "@services/NewsServices";
import { some } from "@utility/helper";
import { useEffect, useState } from "react";
export default function RelatedNews() {

  const [newsData, setNewsData] = useState<some>({})
  const [page, setPage] = useState(1)
  const limit = 5

  useEffect(() => {
    try {
      fetchData()
        .then(data => {
          setNewsData(data.data)
          
        })
    } catch (error) {
      
    }
  }, [])

  const fetchData = async () => {
    return  await NewsServices.get({page: page, limit: limit})
  }

  return (
    <div className="">
      <div className="">
        {newsData != null && newsData.data && newsData.data.length > 0 && <RelatedNewsItem type={true} news={newsData.data[0]} />}
      </div>
      <div className="">
        {newsData != null &&  newsData.data && newsData.data.length > 1 && newsData.data.slice(1).map((news:any, i:any) => {
          return (
            <RelatedNewsItem key={i} news={news} />
          );
        })}
      </div>
    </div>
  );
}
