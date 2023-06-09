import React from "react";
import { useTranslation } from "react-i18next";
import { MenuDetailSlider } from "./MenuDetailSlider";
import { MenuDetailInfo } from "./MenuDetailInfo";
import { MenuDetailStar } from "./MenuDetailStar";
import { MenuDetailComment } from "./MenuDetailComment";



export const MenuDetailBody = () => {
  const { t } = useTranslation();

  return (
    <div className="w-rp py-[120px]">
      <div className="flex gap-x-[24px]">
        <MenuDetailSlider />
        <MenuDetailInfo />
      </div>
     <MenuDetailStar />
     <MenuDetailComment />
    </div>
  );
};
