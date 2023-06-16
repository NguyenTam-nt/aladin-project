import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PolicyItem = () => {
  const navigation = useNavigate();
  const { setElementModal } = useModalContext();
  const handleNavigation = () => {
    navigation(`123`);
  };

  const handleDeleteModal = () => {
    setElementModal(
      <DiglogComfirmDelete message="adminPolicy.message_delete" />
    );
  };

  return (
    <div className="h-[223px] flex flex-col p-[16px] bg-white">
      <p className=" text-_16 font-semibold text-text_black line-clamp-1">
        Hỗ trợ đặt bàn
      </p>
      <p className=" line-clamp-2 text-_14 mr-[16px] text-text_secondary">
        Nhà hàng chúng tôi luôn sẵn sàng hỗ trợ quý khách hàng đặt bàn theo ...
      </p>
      <div className="mt-auto">
        <Button
          onClick={handleNavigation}
          color="empty"
          className=""
          text="adminPolicy.update"
        />
        <Button
          onClick={handleDeleteModal}
          color="empty"
          className="mt-2 border-bg_E73F3F text-bg_E73F3F"
          text="adminPolicy.delete"
        />
      </div>
    </div>
  );
};
