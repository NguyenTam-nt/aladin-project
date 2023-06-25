import { ICStar } from "@assets/icons/ICStar";
import { Avatar } from "@components/Avatar";
import { Colors } from "@constants/color";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import type { IReview } from "@typeRules/index";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  data: IReview;
  onDelete: (id: number) => void;
  onUpdate: (data: IReview) => void;
};

export const ThanksCustomerItem = memo(
  ({ data, onDelete, onUpdate }: Props) => {
    const navigation = useNavigate();
    const { setElementModal } = useModalContext();
    const handleNavigation = () => {
      navigation(
        `${prefixRootRoute.admin}/${pathsAdmin.thankCustomer.prefix}/${data.id}`
      );
    };

    const handleDelete = () => {
      onDelete(Number(data.id));
    };

    const handleDeleteModal = () => {
      setElementModal(
        <DiglogComfirmDelete
          onClick={handleDelete}
          message="customer.message_delete"
        />
      );
    };

    const handleUpdate = () => {
      onUpdate(data);
    };

    return (
      <div className="bg-white h-[434px] relative flex flex-col">
        <button
          onClick={handleUpdate}
          className=" absolute top-[24px] right-[24px]"
        >
          <ICStar
            width={24}
            height={24}
            color={data?.show ? "#FFC564" : Colors.text_white}
          />
        </button>
        <img
          alt=""
          className="w-full object-cover h-[162px]"
          src={data?.linkProduct}
        />
        <div className="p-[16px] flex-1 flex flex-col">
          <p className=" line-clamp-2 text-_16 font-semibold text-text_black">
            {data?.comment}
          </p>
          <div className="mt-[16px] flex items-center gap-x-2">
            <Avatar url={data?.linkGuest} size={48} name={data?.fullname} />
            <div className="flex-1">
              <p className="text-_16 line-clamp-1 font-semibold text-GreyPrimary">
                {data?.fullname}
              </p>
              <p className="text-_12 mt-1 line-clamp-1 font-normal text-text_secondary">
                {data.career}
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <Button
              onClick={handleNavigation}
              color="empty"
              className=""
              text="customer.update"
            />
            <Button
              onClick={handleDeleteModal}
              color="empty"
              className="mt-2 border-bg_E73F3F text-bg_E73F3F"
              text="customer.delete"
            />
          </div>
        </div>
      </div>
    );
  }
);
