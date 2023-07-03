import React from "react";
import { TitleTopic } from "../TitleTopic";
import { TopicPlaceItem } from "./TopicPlaceItem";

export const TopicPlace = () => {
  return (
    <div className="w-rp relative">
      <TitleTopic title="home.place.title" />
      <div className="mt-6 lg:mt-10">
        <TopicPlaceItem />  
      </div>
    </div>
  );
};
