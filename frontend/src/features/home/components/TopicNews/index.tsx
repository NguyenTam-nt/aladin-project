import React from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicNewsItem } from "./TopicNewsItem";
import { paths } from "@constants/routerPublic";

export const TopicNews = () => {
  return (
    <div className="w-rp">
      <TitleWithSeeAll title="home.news.title" pathNavigate={paths.news.prefix} />
      <div className="grid grid-cols-4 gap-x-[24px] mt-[48px]">
        {[1, 2, 3, 4].map((_, index) => {
          return <TopicNewsItem key={index} />;
        })}
      </div>
    </div>
  );
};
