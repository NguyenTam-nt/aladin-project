import React from "react";
import { TitleTopic } from "../TitleTopic";
import { useTranslation } from "react-i18next";
import { TopicPlaceItem } from "./TopicPlaceItem";

export const TopicPlace = () => {
  const { t } = useTranslation();
  return (
    <div className="w-rp relative">
      <TitleTopic title="home.place.title" />
      <TopicPlaceItem />
    </div>
  );
};
