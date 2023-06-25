import type { ITopicHome } from "@typeRules/home";
import React, { memo } from "react";

type Props = {
  data: ITopicHome
}

export const TopicPostItem = memo(({data}:Props) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[26px] lg:h-[365px]">
      <div className="radius-tl-br h-[188px] lg:h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={data?.linkMedia}
          alt=""
        />
      </div>
      <div className="mt-[24px] h-[188px]  lg:h-[80%] flex flex-col lg:pt-[12px]">
        <h4 className="title-32">{data?.title}</h4>
        <div className="text-_14 flex-1 overflow-y-auto lg:text-_24 font-normal mt-[16px] lg:mt-[30px] text-GreyPrimary list-facilities">
          {data?.content}
        </div>
      </div>
    </div>
  );
});
