import { ICStar } from "@assets/icons/ICStar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { useModalContext } from "@contexts/hooks/modal";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import tickSuccessPNG from "@assets/images/tick-success.png"

export const ModalOrderFoodSuccess = () => {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();

  return (
    <div className="w-[872px]  bg-white py-[64px] px-[24px] flex flex-col items-center justify-center">
      <div className="w-[160px] h-[160px] mt-8">
        <img src={tickSuccessPNG} alt="tick success" className="w-full h-full object-contain" />
      </div>
      <h2 className="text-center text-_24 font-bold text-GreyPrimary mt-8">
        {t("order_food_info.modal.title")}
      </h2>
      <span className="text-center text-_16 text-GreyPrimary mt-4"
        dangerouslySetInnerHTML = {{__html: t("order_food_info.modal.sub_title") as string}}
      >
      </span>
      <div className="flex items-center justify-center mt-10">
        <button 
          type="submit"
          className="radius-tl-br16 h-12 w-[200px] py-3 text-center text-sm leading-5 font-bold bg-primary text-white">
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};
