import React from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { PolicyItem } from "./components/PolicyItem";
import { ICPlus } from "@assets/icons/ICPlus";
import { ICAdd } from "@assets/icons/ICAdd";
import { useNavigate } from "react-router-dom";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";

export const Policy = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const handleNavigation = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.policy.prefix}/${pathsAdmin.policy.add}`
    );
  };
  return (
    <>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <TitleTopic name="adminPolicy.title" isRequired={false} />
          <span className="text-_14 ml-4 italic text-text_secondary">
            {t("adminPolicy.maxItem")}
          </span>
        </div>
        <Button
          onClick={handleNavigation}
          className="max-w-[177px]"
          text="adminPolicy.add"
          imageLeft={
            <span className="mr-2">
              <ICAdd />
            </span>
          }
          color={"empty"}
        />
      </div>
      <div className="grid grid-cols-4 gap-[24px]">
        <PolicyItem />
        <PolicyItem />
        <PolicyItem />
        <PolicyItem />
        <PolicyItem />
        <PolicyItem />
        <PolicyItem />
        <PolicyItem />
      </div>
    </>
  );
};
