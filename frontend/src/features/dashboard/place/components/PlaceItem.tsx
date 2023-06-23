import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import type { PlaceType } from "@typeRules/place";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router";

type Props = {
  data: PlaceType
  onDelete: (id: number) => void;
}

export const PlaceItem = ({data, onDelete}: Props) => {
  
  const { setElementModal } = useModalContext();
  const navigation = useNavigate();

  const handleDeleteModal = () => {
    setElementModal(
      <DiglogComfirmDelete
        onClick={handleClickDelete}
        message="adminPlace.notification.delete"
      />
    );
  };

  const handleClickDelete = () => {
    onDelete(Number(data.id));
  }

  const handleUpdate = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.place.prefix}/${data.id}`
    );
  };

  return (
    <div className={clsx("h-auto flex flex-col p-4 bg-white", {
      " ": !data.status
    })}>
      <p className={clsx(" text-_16 font-semibold text-text_black line-clamp-2", {
      "opacity-30": !data.status
    })}>
        {data.name}
      </p>
      <p className={clsx(" line-clamp-1 mt-1 text-_14 mr-4 text-text_secondary", {
        "opacity-30": !data.status
      })}>
        {data.phone}
      </p>
      <div className="mt-4">
        <Button color="empty" className={clsx("", {
            "opacity-30 hover:opacity-30": !data.status
          })} text="adminPlace.update_btn" 
          onClick={handleUpdate} disabled={!data.status}
        />
        <Button color="empty"
          className="mt-2 border-bg_E73F3F text-bg_E73F3F"
          text={data.status ? "adminPlace.delete_btn" : "adminPlace.display_btn"}
          onClick={handleDeleteModal}
        />
      </div>
    </div>
  );
};
