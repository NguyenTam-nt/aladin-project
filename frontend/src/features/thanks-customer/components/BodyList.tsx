import { TopicCustomerItem } from "@features/home/components/TopicCustomer/TopicCustomerItem";
import React from "react";

export const BodyList = () => {
  return (
    <div className="mt-[104px] grid grid-cols-4 gap-[24px]">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
        return <TopicCustomerItem key={index} />;
      })}
    </div>
  );
};
