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
      className="min-h-[199px] flex flex-wrap radius-tl-br bg-text_white cursor-pointer"
    >
      <div className="2xl:w-2/4 w-full flex 2xl:justify-start justify-center 2xl:h-full overflow-hidden rounded-tl-r32">
        <img src={itemRecrui.url} className="max-w-full max-h-[199px]" alt="" />
      </div>
      <div className="2xl:w-2/4 w-full 2xl:py-4 py-6  px-spc26 flex flex-col justify-between">
        <p className="text-base leading-6 font-semibold line-clamp-2 2xl:mb-0 mb-[18px] ">
          {itemRecrui.title}
        </p>
        <div className="flex gap-2 2xl:mb-0 mb-[18px]">
          <DolarIcon width={18} height={18} />
          <p className="text-lg text-secondary leading-22 font-semibold">
            {itemRecrui.salary}
          </p>
        </div>
        <div className="flex gap-2 2xl:mb-0 mb-[18px]">
          <CalendarIcon width={18} height={18} />
          <p className="text-lg leading-22 font-normal">{itemRecrui.endDate}</p>
        </div>
        <div className="flex gap-2">
          <AddressWork width={18} height={18} />
          <p className="text-lg leading-22 font-normal">{itemRecrui.address}</p>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentItem;
