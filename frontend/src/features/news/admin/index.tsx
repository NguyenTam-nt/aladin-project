import MagnifyingGlass from "@assets/icons/MagnifyingGlass";
import TitleOfContentManage from "@components/TitleOfContentManage";
import React, { ButtonHTMLAttributes } from "react";
type Props = {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  handleClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  return <button></button>;
};
const ManageNews = () => {
  return (
    <div>
      <TitleOfContentManage name="news.listNew" />
      <div className="flex gap-3 mt-10 pb-5">
        <div className="relative w-[757px]">
          <input
            type="text"
            className="w-full border border-[#CFCFCF] bg-transparent py-2 pl-12  font-normal text-sm leading-22"
            placeholder="Nhập từ khóa tìm kiếm"
          />
          <div className="absolute left-5 top-2/4 -translate-y-2/4">
            <MagnifyingGlass />
          </div>
        </div>
        <button>thêm bài viết</button>
        <button>Mới nhất</button>
        <button>cũ nhất</button>
      </div>
    </div>
  );
};

export default ManageNews;
