import { ICClear } from "@assets/icons/ICClear";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { ICEyeOff } from "@assets/icons/ICEyeOff";
import { Colors } from "@constants/color";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import React from "react";
import { useTranslation } from "react-i18next";

export const DiglogComfirm = ({
  message,
  onClick,
  onClear,
}: {
  message: string;
  onClick?: () => void,
  onClear?: () => void
}) => {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  return (
    <div className="flex items-center flex-col py-[53px] px-[80px] bg-white justify-center w-[800px] h-auto relative">
      <button onClick={onClear ? onClear : hideModal} className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]">
       <ICClear />
      </button>
      <div>
       <ICEyeOff width={120} height={120} color={Colors.TrueBlue500} />
      </div>
      <span className="mt-[34px] mb-[40px] text-GreyPrimary text-center text-_20 font-bold">{t(message)}</span>
      <div className="flex  justify-center gap-x-[24px]">
      <Button
       type="button"
        onClick={onClear ? onClear : hideModal}
        text="button._cancel"
        color="empty"
        className="!w-[120px] text-TrueBlue_500 border border-TrueBlue_500"
      />
      <Button type="submit" onClick={() => onClick?.()}  text={"button.confirm"} color="primary" className="!w-[120px] bg-TrueBlue_500" />
      </div>
    </div>
  );
};
