import React from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicCustomerItem } from "./TopicCustomerItem";
import { ICHomeTopicCustomerRight } from "@assets/icons/ICHomeTopicCustomerRight";
import { ICHomeTopicCustomerLeft } from "@assets/icons/ICHomeTopicCustomerLeft";

export const TopicCustomer = () => {
  return (
    <div className="relative">
      <div className="absolute right-0 top-[-350px]">
        <ICHomeTopicCustomerRight />
      </div>
      <div className="absolute left-0 bottom-[-350px]">
        <ICHomeTopicCustomerLeft />
      </div>
      <div className="w-rp relative">
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
    </div>
  );
};
