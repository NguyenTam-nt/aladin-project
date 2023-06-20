import { TopicCustomerItem } from "@features/home/components/TopicCustomer/TopicCustomerItem";
import type { IReview } from "@typeRules/index";
import React, { memo } from "react";


type Props = {
  data: IReview[]
}

export const BodyList = memo(({data}:Props) => {
  return (
    <div className="mt-[24px] lg:mt-[104px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
      {data.map((item, index) => {
        return <TopicCustomerItem data={item} key={index} />;
      })}
    </div>
  );
})
