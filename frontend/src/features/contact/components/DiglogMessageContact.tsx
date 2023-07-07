import { ICClear } from "@assets/icons/ICClear";
import { ICErrorMessage } from "@assets/icons/ICErrorMessage";
import { ICRequest } from "@assets/icons/ICRequest";
import { ICSuccessMessage } from "@assets/icons/ICSuccessMessage";
import { useModalContext } from "@contexts/hooks/modal";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors } from "@constants/color";

export const DiglogMessageContact = ({
  email,
  onHide,
}: {
  email: string
  onHide?: () => void;
}) => {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  return (
    <div className="flex items-center flex-col bg-white justify-center w-[90vw] md:w-[600px] lg:w-[800px] h-auto py-[40px] px-[32px] md:px-[50px] lg:px-[100px] relative">
      <button
        onClick={onHide ? onHide : hideModal}
        className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]"
      >
        <ICClear />
      </button>
      <div>
        <ICSuccessMessage />
      </div>
      <span className="mt-[34px] text-center text-GreyPrimary text-_20 font-bold">
        {t("contact.send_success")}
      </span>
      <span className="text-center text-GreyPrimary text-_16 ">
        Vui lòng chờ phẩn hồi qua <span className="font-bold">{email}</span>
      </span>
    </div>
  );
};
