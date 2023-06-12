import React from "react";
import bg_sales from "@assets/images/home/bg_sales.webp";
import { HomeTopicSalesList } from "./HomeTopicSalesList";

export const HomeTopicSales = () => {
  return (
    <div className="w-full lg:h-[544px] flex items-center relative">
      <div className="bg-home_topic_sale absolute inset-0 z-[1]" />
      <img
        className="w-full  h-full object-cover absolute inset-0"
        src={bg_sales}
        alt=""
      />
      <HomeTopicSalesList />
    </div>
  );
};
