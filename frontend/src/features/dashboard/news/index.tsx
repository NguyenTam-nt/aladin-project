import { ICAsc } from "@assets/icons/ICAsc";
import { ICDesc } from "@assets/icons/ICDesc";
import MagnifyingGlass from "@assets/icons/MagnifyingGlass";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { Button } from "@features/dashboard/components/Button";
import React, { ButtonHTMLAttributes, useState } from "react";
import NewItem from "./component/NewItem";
import { Pagination } from "@components/Paginnation";
import { useNavigate } from "react-router-dom";
import { pathsAdmin } from "@constants/routerManager";
import { useTranslation } from "react-i18next";
type Props = {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  handleClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ManageNews = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleAddNew = () => {
    navigate(pathsAdmin.news.add);
  };
  return (
    <div>
      <TitleOfContentManage name="news.listNew" />
      <div className="mt-10 pb-6">
        <div className="flex items-center gap-6 justify-between">
          <div className="w-[800px] relative">
            <input
              type="text"
              className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder={t("news.search_placehoder") as string}
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button
              onClick={handleAddNew}
              text="news.add"
              className="max-w-[177px] whitespace-nowrap"
              imageLeft={
                <span className="mr-2">
                  <ICDesc />
                </span>
              }
              color={"empty"}
            />
            <div className="flex gap-6 justify-between">
              <Button
                onClick={() => {}}
                text="common.desc"
                className="max-w-[177px] whitespace-nowrap"
                imageLeft={
                  <span className="mr-2">
                    <ICDesc />
                  </span>
                }
                color={"empty"}
              />
              <Button
                onClick={() => {}}
                text="common.asc"
                className="max-w-[177px] whitespace-nowrap"
                imageLeft={
                  <span className="mr-2">
                    <ICAsc />
                  </span>
                }
                color={"empty"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        <NewItem id={1} />
        <NewItem id={2} />
        <NewItem id={3} />
        <NewItem id={4} />
        <NewItem id={5} />
        <NewItem id={6} />
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

export default ManageNews;
