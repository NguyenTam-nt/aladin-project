import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import { HomeTopicEventItem } from "./HomeTopicEventItem";

export const HomeTopicEvent = () => {
  const {width} = useWindowResize()
  return (
    <div className="grid grid-cols-1 m992:grid-cols-2">
     <HomeTopicEventItem />
     <HomeTopicEventItem isReversed={width < withResponsive._992} />
     <HomeTopicEventItem isReversed={width > withResponsive._992} />
     <HomeTopicEventItem isReversed />
    </div>
  );
};
