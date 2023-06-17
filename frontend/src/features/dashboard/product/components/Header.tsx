import { ICAdd } from "@assets/icons/ICAdd";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICFilter } from "@assets/icons/ICFilter";
import { Colors } from "@constants/color";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { Button } from "@features/dashboard/components/Button";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Header = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigate()
  const handleNavigate = () => {
    navigation(`${prefixRootRoute.admin}/${pathsAdmin.product.prefix}/${pathsAdmin.product.add}`)
  }
  return (
    <div className="flex items-baseline justify-between">
      <TitleTopic name="adminProduct.title" isRequired={false} />

      <div className="flex items-center flex-1 justify-end gap-x-[24px]">
        <Button
          // onClick={handleNavigation}
          className="max-w-[301px]"
          text="adminProduct.filter"
          imageLeft={
            <span className="mr-[12px]">
              <ICFilter />
            </span>
          }
          image={
            <span className="ml-[22px]">
              <ICArowDown color={Colors.TrueBlue500} />
            </span>
          }
          color={"empty"}
        />

        <Button
          onClick={handleNavigate}
          className="max-w-[177px]"
          text="adminProduct.add"
          imageLeft={
            <span className="mr-2">
              <ICAdd />
            </span>
          }
          color={"empty"}
        />
      </div>
    </div>
  );
});
