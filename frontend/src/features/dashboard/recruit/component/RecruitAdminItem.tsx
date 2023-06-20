import { AddressWork } from "@assets/icons/AddressWork";
import { CalendarIcon } from "@assets/icons/CalendarIcon";
import { DolarIcon } from "@assets/icons/DolarIcon";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  itemRecrui: {
    id: string | number;
    url: string;
    title: string;
    salary: string;
    endDate: string;
    address: string;
  };
}
const RecruitAdminItem = ({ itemRecrui }: Props) => {
  const navigate = useNavigate();
  const { setElementModal } = useModalContext();
  const handleNavigation = () => {
    navigate(`${itemRecrui.id}`);
  };

  const handleDeleteModal = () => {
    setElementModal(<DiglogComfirmDelete message="recruit.message_delete" />);
  };
  return (
    <div className="p-4 bg-white">
      <p className=" line-clamp-2 text-_16 font-semibold text-text_black mb-2 ">
        {itemRecrui.title}
      </p>
      <div className="flex items-center gap-2 mb-[17px]">
        <div className="w-6">
          <DolarIcon width={20} height={20} />
        </div>
        <p className="text-sm text-secondary leading-22 font-semibold">
          {itemRecrui.salary}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-[18px]">
        <div className="w-6">
          <CalendarIcon width={18} height={18} />
        </div>
        <p className="text-sm leading-22 font-normal">
          Hết hạn:{itemRecrui.endDate}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6">
          <AddressWork width={24} height={24} />
        </div>
        <p className="text-sm leading-22 font-normal">{itemRecrui.address}</p>
      </div>
      <div className="mt-6 mb-2">
        <div className="mt-auto">
          <Button
            onClick={handleNavigation}
            color="empty"
            className=""
            text="recruit.update"
          />
          <Button
            onClick={handleDeleteModal}
            color="empty"
            className="mt-2 border-bg_E73F3F text-bg_E73F3F"
            text="recruit.delete"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitAdminItem;
