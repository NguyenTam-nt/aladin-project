import React from "react";
import { DistributorImage } from "@assets/icons";
import SuccesedIcon from "@assets/iconElements/SuccesedIcon";
import useI18n from "@hooks/useI18n";

const DistributorSession = () => {
  const { t } = useI18n();
  const listSucced = [
    "global.distributor.successed.first",
    "global.distributor.successed.second",
    "global.distributor.successed.third",
    "global.distributor.successed.forth",
    "global.distributor.successed.fiveth",
    "global.distributor.successed.sixth",
  ];
  return (
    <div
      className="2xl:px-[190px] lg:px-[158px] pt-[100px] pb-[190px]"
      style={{
        backgroundImage: `url(${DistributorImage})`,
        objectFit: "cover",
      }}
    >
      <div className="max-w-1/2">
        <p className="text-2xl uppercase">
          {t("global.distributor.intened_for")}
        </p>
        <p className="text_linear text-40 font-bold uppercase">
          {t("global.distributor.distributor")}
        </p>
        <p className="text-text-disable text-base mb-6">
          {t("global.distributor.policy")}
        </p>
        {listSucced.map((item, index) => {
          return (
            <div key={index} className="flex gap-1 mb-[10px]">
              <SuccesedIcon />
              <p className="text-base">{t(item)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DistributorSession;
