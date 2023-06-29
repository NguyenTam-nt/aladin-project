import { ICAdd } from "@assets/icons/ICAdd";
import { Pagination } from "@components/Paginnation";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { pathsAdmin } from "@constants/routerManager";
import { recruitService } from "@services/recruitService";
import type { Recruit_type } from "@typeRules/recruit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import RecruitAdminItem from "./component/RecruitAdminItem";

const RecuitmentManage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [listRecruit, setListRecruit] = useState<Recruit_type[]>([]);
  const handleAddRecruit = () => {
    navigate(pathsAdmin.recuire.add);
  };
  const handleDeleteItem = () => {
    if (currentPage === 1) {
      getRcruit();
    } else {
      setCurrentPage(1);
    }
    navigate("");
  };
  const getRcruit = async () => {
    try {
      const { list, totalElement, totalElementPage } =
        await recruitService.getRecruit({
          page: currentPage - 1,
          size: 12,
          sort: "id,desc",
        });
      setListRecruit(list);
      setTotalPages(Math.ceil(totalElementPage / 12));
    } catch (error) {
      console.log("Không lấy được danh sách tuyển dụng");
    }
  };
  useEffect(() => {
    getRcruit();
  }, [currentPage]);
  return (
    <div>
      <div className="flex items-center justify-between mb-[50px]">
        <TitleOfContentManage name="recruit.listRecruit" />
        <Button
          onClick={handleAddRecruit}
          text="recruit.add"
          className="max-w-[190px] whitespace-nowrap"
          imageLeft={
            <span className="mr-2">
              <ICAdd />
            </span>
          }
          color={"empty"}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-[22px] gap-y-10">
        {listRecruit.length > 0 &&
          listRecruit.map((item, index) => {
            return (
              <RecruitAdminItem
                key={index}
                itemRecrui={item}
                handleDelete={handleDeleteItem}
              />
            );
          })}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default RecuitmentManage;
