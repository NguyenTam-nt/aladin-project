import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isRequired?: boolean;
  name: string;
  subTranslattion?: {[key: string]: string}
};

export const TitleTopic = ({ isRequired = true, name, subTranslattion }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center text-_18 xl:text-_24 mb-[32px] font-bold text-GreyPrimary">
      <button className="cursor-auto">{t(name, subTranslattion ? subTranslattion : {})}</button>
      {isRequired ? <span className="text-text_red ml-1">*</span> : null}
    </div>
  );
};
