import { ICClear } from "@assets/icons/ICClear";
import { ICErrorMessage } from "@assets/icons/ICErrorMessage";
import { ICSuccessMessage } from "@assets/icons/ICSuccessMessage";
import { useModalContext } from "@contexts/hooks/modal";
import React from "react";
import { useTranslation } from "react-i18next";

export const DiglogMessage = ({
  message,
  type = "SUCCESS",
}: {
  message: string;
  type?: "SUCCESS" | "ERROR";
}) => {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  return (
    <div className="flex items-center flex-col bg-white justify-center w-[800px] h-[254px] relative">
      <button onClick={hideModal} className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]">
       <ICClear />
      </button>
      <div>
        {type === "SUCCESS" && <ICSuccessMessage />}
        {type === "ERROR" && <ICErrorMessage />}
      </div>
      <span className="mt-[34px] text-GreyPrimary text-_20 font-bold">{t(message)}</span>
    </div>
  );
};
