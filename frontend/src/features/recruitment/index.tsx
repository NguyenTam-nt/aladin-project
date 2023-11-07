import TitleOfContent from "@components/TitleOfContent";
import WapperContent from "@components/WapperContent";
import React, { useEffect, useState } from "react";
import RecruitmentItem from "./RecruitmentItem";
import rectangle from "@assets/images/recruitmentCardIcon.svg";
// import Banner from "@features/news/user/Banner";
import { Pagination } from "@components/Paginnation";
import type { Recruit_type } from "@typeRules/recruit";
import { recruitService } from "@services/recruitService";
import { Banner } from "@components/Banner";
import { HomeTopicType } from "@typeRules/home";

const Recruitment = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [listRecruit, setListRecruit] = useState<Recruit_type[]>([]);

  const getRcruit = async () => {
    try {
      const { list, totalElement, totalElementPage } =
        await recruitService.getRecruit({
          page: currentPage - 1,
          size: 6,
          sort: "desc",
        });
      setListRecruit(list);
      setTotalPages(Math.ceil(totalElementPage / 6));
    } catch (error) {
      // console.log("Không lấy được danh sách tuyển dụng");
    }
  };
  useEffect(() => {
    getRcruit();
  }, [currentPage]);
  return (
    <div className="pb-spc120">
      <Banner type={HomeTopicType.recruit} />
      <WapperContent>
        <div className="lg:pb-spc120 pb-20 px-5">
          <TitleOfContent name="titleofcontent.recruitment" className="mb-6" />
          <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 2xl:gap-x-spc26 2xl:gap-y-10 gap-6">
            {listRecruit.length > 0 &&
              listRecruit.map((itemRecrui, indexRecui) => {
                return (
                  <RecruitmentItem key={indexRecui} itemRecrui={itemRecrui} />
                );
              })}
          </div>
          {totalPages > 1 && (
            <div className="pt-6 flex justify-end">
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

export default Recruitment;
