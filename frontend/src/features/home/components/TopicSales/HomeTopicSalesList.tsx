import React, { memo } from "react";
import { TitleTopic } from "../TitleTopic";
import { useTranslation } from "react-i18next";
import { HomeTopicSalesSlider } from "./HomeTopicSalesSlider";

export const HomeTopicSalesList = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="w-rp-l flex items-center flex-col 2xl:flex-row gap-x-[32px] xl:gap-x-[80px] py-[40px] lg:py-[64px] relative z-[2]">
      <div className="xl:w-[60%] 2xl:w-[40%]">
        <TitleTopic title="home.sales.title" className=" text-text_white" />
        <p className="text-_14 lg:text-_16 mt-[16px] lg:mt-[24px] text-text_white">
          {t("home.sales.des")}
        </p>
      </div>
      <div className="mt-[40px] 2xl:mt-0 flex-1">
       <HomeTopicSalesSlider />
      </div>
    </div>
  );
});
