import React from "react";
import { TitleTopic } from "./TitleTopic";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  pathNavigate: string;
};

export const TitleWithSeeAll = ({ title, pathNavigate }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-x-[20px] gap-0 justify-between items-baseline lg:items-center mt-[50px] lg:mt-[120px]">
        <TitleTopic className="w-[70%] lg:w-[40%]" title={title} />
      <Link className="text-_16 font-semibold lg:text-_20 uppercase lg:font-bold text-primary" to={pathNavigate}>
        {t("button.see_all")}
      </Link>
    </div>
  );
};
