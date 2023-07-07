import { ICClear } from "@assets/icons/ICClear";
import { ICErrorMessage } from "@assets/icons/ICErrorMessage";
import { ICRequest } from "@assets/icons/ICRequest";
import { ICSuccessMessage } from "@assets/icons/ICSuccessMessage";
import { useModalContext } from "@contexts/hooks/modal";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors } from "@constants/color";

export const DiglogMessage = ({
  message,
  type = "SUCCESS",
  onHide,
  nameEmail,
}: {
  message: string;
  type?: "SUCCESS" | "ERROR" | "WARNING";
  onHide?: () => void;
  nameEmail?: string;
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
        {type === "SUCCESS" && <ICSuccessMessage />}
        {type === "ERROR" && <ICErrorMessage width={106} height={106} />}
        {type === "WARNING" && (
          <ICRequest color={Colors.bg_FFE600} width={106} height={106} />
        )}
      </div>
      {nameEmail ? (
        <span className="mt-[34px] text-center text-_14 lg:text-_16 text-red_error font-normal">
          {t(message)} &nbsp; {nameEmail}
        </span>
      ) : (
        <span className="mt-[34px] text-center text-GreyPrimary text-_20 font-bold">
          {t(message)}
        </span>
      )}
    </div>
  );
};

export const useShowMessage = () => {
  const { setElementModal } = useModalContext();
  const showSuccess = (message: string, nameEmail?: string) => {
    setElementModal(
      <DiglogMessage message={message} type="SUCCESS" nameEmail={nameEmail} />
    );
  };

  const showError = (message: string) => {
    setElementModal(<DiglogMessage message={message} type="ERROR" />);
  };

  const showWarning = (message: string) => {
    setElementModal(<DiglogMessage message={message} type="WARNING" />);
  };

  return {
    showSuccess,
    showError,
    showWarning,
  };
};
