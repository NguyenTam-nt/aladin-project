import React from "react";
import { CalendarIcon } from "@assets/icons/CalendarIcon";
import { DolarIcon } from "@assets/icons/DolarIcon";
import { AddressWork } from "@assets/icons/AddressWork";
import { useNavigate } from "react-router-dom";
import type { Recruit_type } from "@typeRules/recruit";

interface Props {
  itemRecrui: Recruit_type;
}
const RecruitmentItem = ({ itemRecrui }: Props) => {
  const navigate = useNavigate();
  const handleViewDetail = (id: number) => {
    navigate(`/tuyen-dung/${id}`);
  };
  return (
    <div
      onClick={() => handleViewDetail(itemRecrui.id!)}
      className="min-h-[199px] flex flex-wrap radius-tl-br bg-text_white cursor-pointer"
    >
      <div className="2xl:w-2/4 w-full flex 2xl:justify-start justify-center 2xl:h-full overflow-hidden rounded-tl-r32">
        <img
          src={itemRecrui.linkMedia}
          className="max-w-full max-h-[199px]"
          alt=""
        />
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
          <p className="text-lg leading-22 font-normal">
            {itemRecrui.expirationDate}
          </p>
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
