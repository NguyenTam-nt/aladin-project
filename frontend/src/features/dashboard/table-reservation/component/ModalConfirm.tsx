import { ICClear } from "@assets/icons/ICClear";
import { ICRequest } from "@assets/icons/ICRequest";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  onClick: () => void;
}
const ModalConfirm = (props: Props) => {
  const { onClick } = props;
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  return (
    <div className="flex items-center flex-col py-[24px] xl:py-[53px] px-[24px] xl:px-[157px] bg-white justify-center w-[90vw] lg:w-[800px] h-auto relative">
      <button
        onClick={hideModal}
        className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]"
      >
        <ICClear />
      </button>
      <div>
        <ICRequest />
      </div>
      <span className="mt-[34px] text-GreyPrimary text-center text-_20 ">
        {t("tableReservation.message_confirm")}
        <span className="ml-1 font-bold">{t("tableReservation.reply")}</span>
      </span>
      <span className="mt-4 mb-[40px] text-GreyPrimary text-center text-xs leading-22">
        {t("tableReservation.message_note")}
        <span className="mx-1 font-bold">{t("tableReservation.reply")}</span>
        <span className="mr-1">{t("tableReservation.next_to")}</span>
        <span className=" font-bold">{t("tableReservation.noReply")}</span>
      </span>
      <div className="flex  justify-center gap-x-[24px]">
        <Button
          type="button"
          onClick={hideModal}
          text="button._cancel"
          color="empty"
          className="!w-[70px] sm:!w-[120px]"
        />
        <Button
          type="submit"
          onClick={() => onClick?.()}
          text={"button.confirm"}
          color="primary"
          className="!w-[120px]"
        />
      </div>
    </div>
  );
};

export default ModalConfirm;
