import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import { HomeTopicEventItem } from "./HomeTopicEventItem";
import { useHandlePost } from "@features/dashboard/hooks/useHandlePost";
import { PostType } from "@typeRules/post";

export const HomeTopicEvent = () => {
  const { width } = useWindowResize();
  const {
    listPost,
  } = useHandlePost(PostType.postEvent);
  return (
    <div className="grid grid-cols-1 m992:grid-cols-2">
   {listPost?.[0] && <HomeTopicEventItem data={listPost[0]} />}   
   {listPost?.[1] &&  <HomeTopicEventItem data={listPost[1]}  isReversed={width < withResponsive._992} />}  
   {listPost?.[2] &&  <HomeTopicEventItem data={listPost[2]}  isReversed={width > withResponsive._992} />}
   {listPost?.[3] &&   <HomeTopicEventItem data={listPost[3]}  isReversed />}
    </div>
  );
};
