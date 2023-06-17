import { ICClear } from "@assets/icons/ICClear";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { ICRequest } from "@assets/icons/ICRequest";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import React from "react";
import { useTranslation } from "react-i18next";

export const ModalConfirm = ({
  onClick
}: {
  onClick?: () => void
}) => {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  return (
    <div className="flex items-center flex-col py-[53px] px-[157px] bg-white justify-center w-[800px] h-auto relative">
      <button onClick={hideModal} className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]">
       <ICClear />
      </button>
      <div>
        <ICRequest />
      </div>
      <span className="mt-[34px] mb-[40px] text-GreyPrimary text-center text-_20 ">{t("adminComment.message_confirm")} <span className=" font-bold">{t("adminComment.this_comment")}</span></span>
      <div className="flex  justify-center gap-x-[24px]">
      <Button
       type="button"
        onClick={hideModal}
        text="button._cancel"
        color="empty"
        className="!w-[120px]"
      />
      <Button type="submit" onClick={() => onClick?.()}  text={"button.confirm"} color="primary" className="!w-[120px]" />
      </div>
    </div>
  );
};
