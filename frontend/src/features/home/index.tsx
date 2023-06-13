import React from "react";
import { Banner } from "./components/TopicBanner/Banner";
import { HomeTopicDevice } from "./components/TopicDevice/HomeTopicDevice";
import { HomeTopicSales } from "./components/TopicSales/HomeTopicSales";
import { TopicMenu } from "./components/TopicMenu";
import { TopicVideo } from "./components/TopicVideo";
import { TopicPost } from "./components/TopicPost";
import { TopicCustomer } from "./components/TopicCustomer";
import { TopicNews } from "./components/TopicNews";
import { TopicForm } from "./components/TopicForm";
import { TopicPlace } from "./components/TopicPlace";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="home-body">
        <HomeTopicDevice />
        <HomeTopicSales />
        <TopicMenu />
        <TopicVideo />
        <div className="pt-[80px] pb-[24px] lg:pb-[100px]">
          <TopicPost />
          <TopicCustomer />
          <TopicNews />
          <TopicForm />
          <TopicPlace />
        </div>
      </div>
    </>
  );
};
