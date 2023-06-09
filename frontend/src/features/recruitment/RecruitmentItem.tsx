import React from "react";
import { CalendarIcon } from "@assets/icons/CalendarIcon";
import { DolarIcon } from "@assets/icons/DolarIcon";
import { AddressWork } from "@assets/icons/AddressWork";
import { useNavigate } from "react-router-dom";

interface Props {
  itemRecrui: {
    url: string;
    title: string;
    salary: string;
    endDate: string;
    address: string;
  };
}
const RecruitmentItem = ({ itemRecrui }: Props) => {
  const navigate = useNavigate();
  const handleViewDetail = () => {
    navigate("/tuyen-dung/chitiettuyendung");
  };
  return (
    <div
      onClick={handleViewDetail}
      className="min-h-[199px] flex radius-tl-br bg-text_white cursor-pointer"
    >
      <div className="w-2/4 overflow-hidden rounded-tl-r32 h-full">
        <img src={itemRecrui.url} className="w-full" alt="" />
      </div>
      <div className="w-2/4 py-4 px-spc26 flex flex-col justify-between">
        <p className="text-base leading-6 font-semibold line-clamp-2  ">
          {itemRecrui.title}
        </p>
        <div className="flex gap-2">
          <DolarIcon width={18} height={18} />
          <p className="text-sm text-secondary leading-22 font-semibold">
            {itemRecrui.salary}
          </p>
        </div>
        <div className="flex gap-2">
          <CalendarIcon width={18} height={18} />
          <p className="text-sm leading-22 font-normal">{itemRecrui.endDate}</p>
        </div>
        <div className="flex gap-2">
          <AddressWork width={18} height={18} />
          <p className="text-sm leading-22 font-normal">{itemRecrui.address}</p>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentItem;
