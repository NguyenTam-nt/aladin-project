import React, { memo } from "react";
import { TopicMenuItem } from "./TopicMenuItem";

export const TopicMenuList = memo(() => {
  return (
    <div className="grid grid-cols-4 gap-x-[24px] mt-[48px]">
      {[1, 2, 3, 4].map((_, index) => {
        return <TopicMenuItem key={index} />;
      })}
    </div>
  );
});

