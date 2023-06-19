import { ICAsc } from "@assets/icons/ICAsc";
import { ICDesc } from "@assets/icons/ICDesc";
import MagnifyingGlass from "@assets/icons/MagnifyingGlass";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { Button } from "@features/dashboard/components/Button";
import React, { ButtonHTMLAttributes } from "react";
type Props = {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  handleClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ManageNews = () => {
  return (
    <div>
      <TitleOfContentManage name="news.listNew" />
      <div className=" gap-3 mt-10 pb-5">
        <div className="flex items-center gap-6 justify-between">
          <div className="w-[800px] relative">
            <input
              type="text"
              className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder="Nhập từ khóa tìm kiếm"
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button
              onClick={() => {}}
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
        <div className="flex items-center justify-center gap-4"></div>
      </div>
    </div>
  );
};

export default ManageNews;
