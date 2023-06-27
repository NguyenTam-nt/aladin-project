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
import { useNavigate } from "react-router-dom";

export const ModalOrderFoodSuccess = () => {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  const navigate = useNavigate()

  

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="wrp lg:w-[872px]  ">
        <div className="px-4 lg:px-0 ">
          <div className="bg-white py-8 lg:py-16 px-4 lg:px-6 flex flex-col items-center justify-center radius-tl-br">
            <div className="w-[80px] lg:w-[160px] h-80px lg:h-[160px] lg:mt-8">
              <img src={tickSuccessPNG} alt="tick success" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-center text-_16 lg:text-_24 font-bold text-GreyPrimary mt-6 lg:mt-8">
              {t("order_food_info.modal.title")}
            </h2>
            <span className="text-center text-_14 lg:text-_16 text-GreyPrimary mt-4"
              dangerouslySetInnerHTML = {{__html: t("order_food_info.modal.sub_title") as string}}
            >
            </span>
            <div className="flex items-center justify-center mt-6 lg:mt-10">
              <button 
                type="submit"
                className="radius-tl-br16 h-12 w-[200px] py-3 text-center text-sm leading-5 font-bold bg-primary text-white"
                  onClick={() => {navigate("/"); hideModal()}}
                >
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
