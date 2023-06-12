import { ICArowRight } from "@assets/icons";
import { Button } from "@components/Button";
import React from "react";
import { useTranslation } from "react-i18next";

export const BannerText = () => {
  const { t } = useTranslation();
  return (
    <div className=" absolute left-0 top-[50%] w-full translate-y-[-50%] z-[4] flex justify-center">
      <div className="w-rp text-text_white">
        <h2 className="title-64 ">{t("home.banner.title")}</h2>
        <p className="text-_24">{t("home.banner.des")}</p>
        <Button
          className="min-w-[159px] h-[56px] mt-[24px]"
          color="primary"
          image={
            <span className="ml-2">
              <ICArowRight />
            </span>
          }
          text={"button.see_more"}
        />
      </div>
    </div>
  );
};
