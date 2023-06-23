import { ICClear } from "@assets/icons/ICClear";
import { useModalContext } from "@contexts/hooks/modal";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors } from "@constants/color";
import { ICStar } from "@assets/icons/ICStar";

export const DiglogMessage = ({
  message,
}: {
  message: string;
}) => {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  return (
    <div className="flex items-center flex-col bg-white justify-center w-[800px] h-auto py-[40px] px-[100px] relative">
      <button
        onClick={hideModal}
        className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]"
      >
        <ICClear />
      </button>
      <div>
       <ICStar width={114} height={110} color={Colors.bg_FFC344} />
      </div>
      <span className="mt-[34px] text-center text-GreyPrimary text-_20 font-bold">
        {t(message)}
      </span>
    </div>
  );
};