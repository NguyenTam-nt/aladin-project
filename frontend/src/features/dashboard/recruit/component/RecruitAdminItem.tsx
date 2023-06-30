import { AddressWork } from "@assets/icons/AddressWork";
import { CalendarIcon } from "@assets/icons/CalendarIcon";
import { DolarIcon } from "@assets/icons/DolarIcon";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { recruitService } from "@services/recruitService";
import type { Recruit_type } from "@typeRules/recruit";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  itemRecrui: Recruit_type;
  handleDelete: () => void;
}
const RecruitAdminItem = ({ itemRecrui, handleDelete }: Props) => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useShowMessage();
  const { setElementModal } = useModalContext();
  const handleNavigation = () => {
    navigate(`${itemRecrui.id}`);
  };

  const handleDeleteModal = (id: number) => {
    const handleDeleteRecuit = async () => {
      try {
        await recruitService.deleteRecruit(id);
        showSuccess("message.actions.success.delete_banner");
        handleDelete();
      } catch (error) {
        showError("message.actions.error.delete");
      }
    };
    setElementModal(
      <DiglogComfirmDelete
        message="recruit.message_delete"
        onClick={handleDeleteRecuit}
      />
    );
  };

  return (
    <div className="p-4 bg-white">
      <p className=" line-clamp-2 text-_16 font-semibold min-h-[48px] text-text_black mb-2">
        {itemRecrui.title}
      </p>
      <div className="flex items-center gap-2 mb-[17px]">
        <div className="w-6">
          <DolarIcon width={24} height={24} />
        </div>
        <p className="text-sm text-secondary leading-22 font-semibold">
          {itemRecrui.salary}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-[18px]">
        <div className="w-6">
          <CalendarIcon width={24} height={24} />
        </div>
        <p className="text-sm leading-22 font-normal">
          Hết hạn:{FomatDateYY_MM_DD(itemRecrui.expirationDate)}
        </p>
      </div>
      <div className="flex items-center gap-2 min-h-[48px]">
        <div className="w-6">
          <AddressWork width={24} height={24} />
        </div>
        <p className="text-sm leading-22 font-normal line-clamp-2">
          {itemRecrui.address}
        </p>
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
            onClick={() => {
              handleDeleteModal(itemRecrui.id!);
            }}
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
