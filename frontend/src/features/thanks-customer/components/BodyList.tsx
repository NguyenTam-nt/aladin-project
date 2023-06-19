import { TopicCustomerItem } from "@features/home/components/TopicCustomer/TopicCustomerItem";
import React from "react";

export const BodyList = () => {
  return (
    <div className="mt-[24px] lg:mt-[104px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
        return <TopicCustomerItem key={index} />;
      })}
    </div>
  );
};
