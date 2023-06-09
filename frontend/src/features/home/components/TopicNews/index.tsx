import React from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicNewsItem } from "./TopicNewsItem";
import { paths } from "@constants/routerPublic";
import { ICHomeTopicNewsRight } from "@assets/icons/ICHomeTopicNewsRight";

export const TopicNews = () => {
  return (
    <div className=" relative">
      <div className="absolute right-0 top-[50px]">
        <ICHomeTopicNewsRight />
      </div>
      <div className="w-rp relative">
        <TitleWithSeeAll
          title="home.news.title"
          pathNavigate={paths.news.prefix}
        />
        <div className="grid grid-cols-4 gap-x-[24px] mt-[48px]">
          {[1, 2, 3, 4].map((_, index) => {
            return <TopicNewsItem key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
