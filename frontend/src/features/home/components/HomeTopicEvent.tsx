import React from "react";
import { HomeTopicEventItem } from "./HomeTopicEventItem";

export const HomeTopicEvent = () => {
  return (
    <div className="grid grid-cols-2 mb-[80px]">
     <HomeTopicEventItem />
     <HomeTopicEventItem />
     <HomeTopicEventItem isReversed />
     <HomeTopicEventItem isReversed />
    </div>
  );
};
