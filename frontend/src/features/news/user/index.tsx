import React, { useEffect, useState } from "react";
import WapperContent from "../../../components/WapperContent";
import TitleOfContent from "@components/TitleOfContent";
import imageCard from "@assets/images/imgCard.png";
import { Pagination } from "@components/Paginnation";
import NewItem from "@components/NewItem";
import { Banner } from "@components/Banner";
import { HomeTopicType } from "@typeRules/home";
import type { newItem_type } from "@typeRules/new";
import type { IParams } from "@typeRules/index";
import { newService } from "@services/newService";
const PromotionPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [listNews, setListNews] = useState<newItem_type[]>([]);
  const getListNew = async (params: IParams) => {
    try {
      const { list, totalElement, totalElementPage } = await newService.getNews(
        params
      );
      setListNews(list);
      setTotalPages(Math.ceil(totalElementPage / 12));
    } catch (error) {
      console.log("Không thể lấy dánh sách tin tức");
    }
  };
  useEffect(() => {
    getListNew({ page: currentPage - 1, size: 12, sort: `id,desc` });
  }, [currentPage]);
  return (
    <div className="">
      <Banner type={HomeTopicType.news} />

      <WapperContent>
        <div className="md:pb-[120px] pb-20 px-5">
          <TitleOfContent
            name="titleofcontent.news"
            className="md:mb-spc60 mb-6"
          />
          {listNews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  m992:gap-x-6 xl:grid-cols-4 gap-x-5 md:gap-y-10 gap-y-6 mb-10">
              {listNews.map((itemNew, indexN) => {
                return <NewItem key={indexN} itemNew={itemNew} />;
              })}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-end">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </WapperContent>
    </div>
  );
};

export default PromotionPage;
