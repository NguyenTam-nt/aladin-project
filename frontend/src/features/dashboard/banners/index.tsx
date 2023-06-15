import React from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { BannerHome } from "./components/BannerHome";
import { BannerItem } from "./components/BannerItem";

export enum BannerType {
  "about" = "ABOUT",
  "order" = "ORDER",
  "menu" = "MENU",
  "news" = "NEWS",
  "contact" = "CONTACT",
  "recruitment" = "RECRUITMENT",
}

const banners = [
  {
    name: "giới thiệu",
    type: BannerType.about,
  },
  {
    name: "đặt bàn",
    type: BannerType.order,
  },
  {
    name: "thực đơn",
    type: BannerType.menu,
  },
  {
    name: "tin tức",
    type: BannerType.news,
  },
  {
    name: "liên hệ",
    type: BannerType.contact,
  },
  {
    name: "tuyển dụng",
    type: BannerType.recruitment,
  },
];

export const BannerAdmin = () => {
  return (
    <div className="grid grid-cols-1 gap-y-[24px]">
      <div>
        <TitleTopic
          name="adminBanner.title"
          subTranslattion={{ page: "Trang chủ" }}
        />
        <BannerHome />
      </div>
        {banners.map((item, index) => {
          return <BannerItem key={index} name={item.name} type={item.type} />;
        })}
    </div>
  );
};
