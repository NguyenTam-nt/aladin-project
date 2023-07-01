import { ICQuotation } from "@assets/icons/ICQuotation";
import { Avatar } from "@components/Avatar";
import type { IReview } from "@typeRules/index";
import React, { memo } from "react";

type Props = {
  data: IReview;
};

export const TopicCustomerItem = memo(({ data }: Props) => {
  return (
    <div className="p-[24px] flex flex-col h-[426px] bg-white radius-tl-br">
      <div className="w-full  h-[148px]">
        <img
          className="w-full h-full object-cover radius-tl-br"
          src={data?.linkProduct}
        />
      </div>
      <div className="my-[16px]">
        <ICQuotation />
      </div>
      <div className="text-_14 overflow-y-auto list-facilities font-normal text-GreyPrimary line-clamp-5 leading-[22px]">
        {data?.comment}
      </div>
      <div className="mt-auto flex items-center gap-x-2">
        <div className="w-[48px] h-[48px]">
          <Avatar size={48} url={data?.linkGuest} name={data?.fullname} />
        </div>
        <div className="flex-1 flex flex-col">
          <span className="text-_16 max-w-[70%] lg:max-w-[80%] line-clamp-1 font-semibold text-GreyPrimary">
            {data?.fullname}
          </span>
          <p className="text-_12 mt-1 line-clamp-1 font-normal text-text_secondary">
            {data?.career}
          </p>
        </div>
      </div>
    </div>
  );
});
