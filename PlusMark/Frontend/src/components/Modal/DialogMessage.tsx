import { ICClear } from "@assets/iconElements/ICClear";
import { ICErrorMessage } from "@assets/iconElements/ICErrorMessage";
import { ICRequest } from "@assets/iconElements/ICRequest";
import { ICSuccessMessage } from "@assets/iconElements/ICSuccessMessage";
import { ModalContext } from "@contexts/contextModal";
import useI18n from "@hooks/useI18n";
import { memo, useContext, useState } from "react";

interface Props {
  message: string;
  type?: "SUCCESS" | "ERROR" | "WARNING";
  onHide?: () => void;
}

export const DiglogMessage = (props: Props) => {
  const { message, type, onHide } = props;
  const { setShowModal, closeModal, setContentModal } =
    useContext(ModalContext);
  const { t } = useI18n();
  return (
    <>
      <div className="flex items-center flex-col bg-white justify-center md:w-[600px] lg:w-[800px] h-auto p-8 bg-__white font-PublicSans relative">
        <button
          onClick={() => (onHide ? onHide() : closeModal())}
          className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]"
        >
          <ICClear />
        </button>
        <div className="my-12">
          {type === "SUCCESS" && <ICSuccessMessage />}
          {type === "ERROR" && <ICErrorMessage width={106} height={106} />}
          {type === "WARNING" && <ICRequest width={106} height={106} />}
        </div>
        <span className="mt-4 text-center text-black02 text-normal1 font-semibold">
          {t(message)}
        </span>
      </div>
    </>
  );
};

export const useShowMessage = () => {
  const { setShowModal, closeModal, setContentModal } =
    useContext(ModalContext);

  const showSuccess = (message: string) => {
    setContentModal(<DiglogMessage message={message} type="SUCCESS" />);
    setShowModal(true);
  };

  const showError = (message: string) => {
    setContentModal(<DiglogMessage message={message} type="ERROR" />);
    setShowModal(true);
  };

  const showWarning = (message: string) => {
    setContentModal(<DiglogMessage message={message} type="WARNING" />);
    setShowModal(true);
  };

  return {
    showSuccess,
    showError,
    showWarning,
  };
};
