import React from "react";
import { CalendarIcon } from "@assets/icons/CalendarIcon";
import { DolarIcon } from "@assets/icons/DolarIcon";
import { AddressWork } from "@assets/icons/AddressWork";
import { useNavigate } from "react-router-dom";
import type { Recruit_type } from "@typeRules/recruit";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { useTranslation } from "react-i18next";

interface Props {
  itemRecrui: Recruit_type;
}
const RecruitmentItem = ({ itemRecrui }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleViewDetail = (id: number) => {
    navigate(`/tuyen-dung/${id}`);
  };
  return (
    <div
      onClick={() => handleViewDetail(itemRecrui.id!)}
      className="min-h-[199px] flex flex-wrap radius-tl-br bg-text_white cursor-pointer"
    >
      <div className="xl:w-2/4 w-full flex xl:justify-start justify-center 2xl:h-full overflow-hidden rounded-tl-r32">
        <img src={itemRecrui.linkMedia} className="w-full h-[199px]" alt="" />
      </div>
      <div className="xl:w-2/4 w-full xl:py-4 py-6  px-spc26 flex flex-col justify-between">
        <p className="text-base leading-6 font-semibold line-clamp-2 xl:mb-0 mb-[18px] ">
          {itemRecrui.title}
        </p>
        <div className="flex gap-2 xl:mb-0 mb-[18px]">
          <DolarIcon width={24} height={24} />
          <p className="text-sm max-w-[85%] text-secondary leading-22 font-semibold">
            {itemRecrui.salary}
          </p>
        </div>
        <div className="flex gap-2 xl:mb-0 mb-[18px]">
          <CalendarIcon width={24} height={24} />
          <p className="text-sm max-w-[85%] leading-22 font-normal">
            {t("recruit.end_time")}:
            {FomatDateYY_MM_DD(itemRecrui.expirationDate!)}
          </p>
        </div>
        <div className="flex gap-2">
          <AddressWork width={24} height={24} />
          <p className="text-sm max-w-[85%] leading-22 font-normal line-clamp-2">
            {itemRecrui.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentItem;
