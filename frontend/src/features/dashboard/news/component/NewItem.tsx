import { Avatar } from "@components/Avatar";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { newService } from "@services/newService";
import type { newItem_type } from "@typeRules/new";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  itemNew: newItem_type;
  handleDelete: () => void;
}
const NewItem = memo(({ itemNew, handleDelete }: Props) => {
  const navigation = useNavigate();
  const { setElementModal } = useModalContext();
  const { showError, showSuccess } = useShowMessage();
  const handleNavigation = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.news.prefix}/${itemNew.id}`
    );
  };

  const handleDeleteModal = async (id: number) => {
    const handleClickDeleted = async () => {
      try {
        await newService.deleteNewId(id);
        handleDelete();
        showSuccess("message.actions.success.delete_banner");
      } catch (error) {
        showError("message.actions.error.delete");
      }
    };
    setElementModal(
      <DiglogComfirmDelete
        message="news.message_delete"
        onClick={handleClickDeleted}
      />
    );
  };
  return (
    <div className="bg-white min-h-[434px] flex flex-col">
      <img
        alt=""
        className="w-full object-cover h-[288px]"
        src={itemNew.linkMedia || ""}
      />
      <div className="p-4 flex-1 flex flex-col">
        <p className=" line-clamp-2 text-_16 font-semibold text-text_black">
          {itemNew.title}
        </p>
        <p className="mb-6 text-sm leading-22 font-normal line-clamp-3 text-text_secondary">
          {itemNew.description}
        </p>
        <div className="mt-auto">
          <Button
            onClick={handleNavigation}
            color="empty"
            className=""
            text="news.update"
          />
          <Button
            onClick={() => handleDeleteModal(itemNew.id!)}
            color="empty"
            className="mt-2 border-bg_E73F3F text-bg_E73F3F"
            text="news.delete"
          />
        </div>
      </div>
    </div>
  );
});

export default NewItem;
