import React from "react";
import { Banner } from "./components/TopicBanner/Banner";
import { HomeTopicDevice } from "./components/TopicDevice/HomeTopicDevice";
import { HomeTopicSales } from "./components/TopicSales/HomeTopicSales";
import { TopicMenu } from "./components/TopicMenu";
import { TopicVideo } from "./components/TopicVideo";
import { TopicPost } from "./components/TopicPost";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="home-body">
        <HomeTopicDevice />
        <HomeTopicSales />
        <TopicMenu />
        <TopicVideo />
        <div className="py-[80px]">
          <TopicPost />
        </div>
      </div>
    </>
  );
};
