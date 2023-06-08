import React from "react";
import { GroupTile } from "./GroupTile";
import { TopicMenuList } from "./TopicMenuList";
import { TopicMenuGroup } from "./TopicMenuGroup";

const data = [
  {
    title: "Nước lẩu",
    listItem: ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 4 ngăn"],
  },
  {
    title: "MÓN LẺ",
    listItem: ["TRÁNG MIỆNG", "NƯỚNG", "HẢI SẢN", "MÓN CHIÊN", "KEM"],
  },
];

export const TopicMenu = () => {
  return (
    <div className="w-rp py-[120px]">
      <div className="grid grid-cols-1 gap-y-[80px]">
        {data.map((item, index) => {
          return (
           <TopicMenuGroup key={index} title={item.title} listItem={item.listItem} />
          );
        })}
      </div>
    </div>
  );
};
