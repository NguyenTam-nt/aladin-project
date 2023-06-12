import React from "react";
import { TitleTopic } from "../TitleTopic";
import { useTranslation } from "react-i18next";

type Props = {
    title: string
    listItem: string[]
}

export const GroupTile = ({title, listItem}:Props) => {
    const {t} = useTranslation()
  return (
    <div className="flex justify-between items-center pb-[16px] border-b border-text_A1A0A3">
      <TitleTopic title={title} />
      <div className="flex text-_16 font-semibold lg:text-_20 lg:font-bold gap-x-[32px] uppercase text-text_secondary">
        {
            [].map((item, index) => {
                return   <p key={index}>{item}</p>
            })
        }
        <p className="text-primary">{t("button.see_all")}</p>
      </div>
    </div>
  );
};
