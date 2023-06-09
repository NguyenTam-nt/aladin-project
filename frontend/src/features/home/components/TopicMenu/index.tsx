import React from "react";
import { TopicMenuGroup } from "./TopicMenuGroup";
import { ICHomeTopicMenuLeft } from "@assets/icons/ICHomeTopicMenuLeft";
import { ICHomeTopicMenuRight } from "@assets/icons/ICHomeTopicMenuRight";

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
    <div className="relative">
      <div className="absolute left-0 bottom-0">
        <ICHomeTopicMenuLeft />
      </div>
      <div className="absolute right-0 top-0">
        <ICHomeTopicMenuRight />
      </div>
      <div className="w-rp py-[120px]">
        <div className="grid grid-cols-1 gap-y-[80px]">
          {data.map((item, index) => {
            return (
              <TopicMenuGroup
                key={index}
                title={item.title}
                listItem={item.listItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
