import React, { memo } from "react";
import { TitleTopic } from "../TitleTopic";
import { useTranslation } from "react-i18next";
import { ICArowRight } from "@assets/icons";
import { Colors } from "@constants/color";
import { Button } from "@components/Button";
import { HomeTopicSalesSlider } from "./HomeTopicSalesSlider";

export const HomeTopicSalesList = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="w-rp-l flex items-center flex-col lg:flex-row gap-x-[80px] py-[40px] lg:py-[64px] relative z-[2]">
      <div className="lg:w-[40%]">
        <TitleTopic title="home.sales.title" className=" text-text_white" />
        <p className="text-_14 lg:text-_16 mt-[16px] lg:mt-[24px] text-text_white">
          {t("home.sales.des")}
        </p>
      </div>
      <div className="mt-[40px] lg:mt-0 flex-1">
       <HomeTopicSalesSlider />
      </div>
    </div>
  );
});
