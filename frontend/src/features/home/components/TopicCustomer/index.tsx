import React from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicCustomerItem } from "./TopicCustomerItem";

export const TopicCustomer = () => {
  return (
    <div className="w-rp">
      <TitleWithSeeAll title="home.customer.title" pathNavigate="" />
      <div className="grid grid-cols-4 gap-[24px] [&>div]:flex [&>div]:flex-col [&>div]:gap-y-[24px]">
        <div className=" justify-center">
          <TopicCustomerItem />
        </div>
        <div className="mt-[100px]">
          <TopicCustomerItem />
          <TopicCustomerItem />
        </div>
        <div>
          <TopicCustomerItem />
          <TopicCustomerItem />
        </div>
        <div className=" justify-center">
          <TopicCustomerItem />
        </div>
      </div>
    </div>
  );
};
