import React from "react";
import { Banner } from "./components/TopicBanner/Banner";
import { TopicCustomer } from "./components/TopicCustomer";
import { HomeTopicDevice } from "./components/TopicDevice/HomeTopicDevice";
import { TopicForm } from "./components/TopicForm";
import { TopicMenu } from "./components/TopicMenu";
import { TopicNews } from "./components/TopicNews";
import { TopicPlace } from "./components/TopicPlace";
import { TopicPost } from "./components/TopicPost";
import { HomeTopicSales } from "./components/TopicSales/HomeTopicSales";
import { TopicVideo } from "./components/TopicVideo";

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
