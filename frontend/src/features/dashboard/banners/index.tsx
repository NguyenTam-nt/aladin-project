import React from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { BannerHome } from "./components/BannerHome";
import { BannerItem } from "./components/BannerItem";
import { HomeTopicType } from "@typeRules/home";
import { useTranslation } from "react-i18next";

const banners = [
  {
    name: "giới thiệu",
    type: HomeTopicType.about,
  },
  {
    name: "đặt bàn",
    type: HomeTopicType.book,
  },
  {
    name: "thực đơn",
    type: HomeTopicType.menu,
  },
  {
    name: "tin tức",
    type: HomeTopicType.news,
  },
  {
    name: "liên hệ",
    type: HomeTopicType.contact,
  },
  {
    name: "tuyển dụng",
    type: HomeTopicType.recruit,
  },
];

export const BannerAdmin = () => {
  const {t} = useTranslation()
  return (
    <div className="grid grid-cols-1 gap-y-[24px]">
      <div>
        <div className="flex items-baseline">
        <TitleTopic
          name="adminBanner.title"
          subTranslattion={{ page: "Trang chủ" }}
        />
        <span className="text-_14 text-text_A1A0A3 italic ml-2">
          {t("adminBanner.maxBanner")}
        </span>
        </div>
        <BannerHome />
       
      </div>
        {banners.map((item, index) => {
          return <BannerItem key={index} name={item.name} type={item.type} />;
        })}
    </div>
  );
};
