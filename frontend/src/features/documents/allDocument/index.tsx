import { paths } from "@constants/router";
import NewsBanner from "@features/news/components/NewsBanner";
import NewsList from "@features/news/components/NewsList";
import Pagination from "@features/news/components/Paginnation";
import { newsService } from "@services/newsService";
import type { INews } from "@typeRules/news";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

const AllDocument = () => {
  const navigatonToDetail = `${paths.news.prefix}/${paths.news.detail}`
  const [searchParam] = useSearchParams();
  const [bannerItem , setBannerItem] = useState<INews[]>([])
  const  [data , setData] = useState<INews[]>([])
  const [currentPage , setCurrentPage] = useState(1)
  const [totalPages , setTotalPages] = useState(0)
  
  const getNewsList = (page: number, id?: string) => {
    if (id) {
      newsService
        .gewNewCategory({ page: page, size: 8 }, "", id)
        .then((news) => {
          if (news.data.length >= 2) {
            setBannerItem(news.data.slice(0, 2));
            setData(news.data.slice(2));
          } else {
            setBannerItem([]);
            setData(news.data);
          }
          setTotalPages(Math.ceil(news.total/8));
        });
    } else {
      newsService.getNews({ page: page, size: 8 }).then((news) => {
        if (news.data.length >= 2) {
          setBannerItem(news.data.slice(0, 2));
          setData(news.data.slice(2 ));
        } else {
          setBannerItem([]);
          setData(news.data);
        }
        setTotalPages(Math.ceil(news.total/8));
      });
    }
  };

  const onChangePage = (page: number) => {

    setCurrentPage(page);
    if (searchParam.get("id")) {
      if (searchParam.get("id")) {
        getNewsList(page - 1, searchParam.get("id") || "0");
        return;
      }
    } else {
      if (searchParam.get("type")) {
        getNewsList(page - 1, searchParam.get("type") || "0");
        return;
      }
      getNewsList(page - 1);
    }
  };
 
  useEffect(() => {
    onChangePage(1);
  }, [searchParam]);

  return (
    <div className="w-rp  justify-between items-center mb-[120px] ">
     {bannerItem.length > 0  && <NewsBanner newsBanner={bannerItem}  navigationToDetail={navigatonToDetail} /> } 
      <NewsList newsItem={data}  navigationToDetail={navigatonToDetail}  />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={onChangePage} />
    </div>
  );
};

export default AllDocument