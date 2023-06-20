import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import type { INews } from "@typeRules/index";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  data: INews
  onDelete: (id:number) => void
}

export const PolicyItem = ({data, onDelete}:Props) => {
  const navigation = useNavigate();
  const { setElementModal } = useModalContext();
  const handleNavigation = () => {
    navigation(`${data.id}`);
  };

  const handleDelete = () => {
    onDelete(Number(data.id))
  }

  const handleDeleteModal = () => {
    setElementModal(
      <DiglogComfirmDelete onClick={handleDelete} message="adminPolicy.message_delete" />
    );
  };

  return (
    <div className="h-[223px] flex flex-col p-[16px] bg-white">
      <p className=" text-_16 font-semibold text-text_black line-clamp-1">
       {data.title}
      </p>
      <p className=" line-clamp-2 text-_14 mr-[16px] text-text_secondary">
      {data.description}
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
