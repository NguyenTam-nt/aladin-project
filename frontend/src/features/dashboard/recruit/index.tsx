import TitleOfContentManage from "@components/TitleOfContentManage";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { pathsAdmin } from "@constants/routerManager";
import { ICDesc } from "@assets/icons/ICDesc";
import RecruitAdminItem from "./component/RecruitAdminItem";
import { Pagination } from "@components/Paginnation";
import NewItem from "@components/NewItem";

const RecuitmentManage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleAddRecruit = () => {
    navigate(pathsAdmin.recuire.add);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-[50px]">
        <TitleOfContentManage name="recruit.listRecruit" />
        <Button
          onClick={handleAddRecruit}
          text="news.add"
          className="max-w-[177px] whitespace-nowrap"
          imageLeft={
            <span className="mr-2">
              <ICDesc />
            </span>
          }
          color={"empty"}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-[22px] gap-y-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return (
            <RecruitAdminItem
              key={item}
              itemRecrui={{
                id: 1,
                url: "",
                title: "Tên cơ sở - Số 23 Ngụy Như Kon Tum",
                salary: "10.000.000 - 20.000.000",
                endDate: "30/12/2023",
                address: "23 Cự Lộc, Thanh Xuân, Hà Nội",
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={10}
        />
      </div>
    </div>
  );
};

export default RecuitmentManage;
