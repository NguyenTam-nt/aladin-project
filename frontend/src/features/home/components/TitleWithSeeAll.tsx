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
    <div className="flex justify-between items-center mt-[120px]">
        <TitleTopic className="w-[40%]" title={title} />
      <Link className="text-_20 font-bold text-primary" to={pathNavigate}>
        {t("button.see_all")}
      </Link>
    </div>
  );
};
