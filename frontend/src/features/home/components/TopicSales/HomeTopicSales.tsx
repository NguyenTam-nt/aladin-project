import React from "react";
import bg_sales from "@assets/images/home/bg_sales.webp";
import { HomeTopicSalesList } from "./HomeTopicSalesList";
import { Image } from "@components/Image";

export const HomeTopicSales = () => {
  return (
    <div className="w-full 2xl:h-[544px] flex items-center relative">
      <div className="bg-home_topic_sale absolute inset-0 z-[1]" />
      <Image
        alt={bg_sales}
        className="w-full  h-full object-cover absolute inset-0"
      />
      <HomeTopicSalesList />
    </div>
  );
};
