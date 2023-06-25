import { TopicMenuItem } from "@features/home/components/TopicMenu/TopicMenuItem";
import type { IProduct } from "@typeRules/product";
import React, { memo } from "react";

type Props = {
  data: IProduct[];
};

export const MenuListData = memo(({ data }: Props) => {
  return (
    <div className="mt-[32px] grid grid-cols-2 xl:grid-cols-3 gap-[24px]">
      {data.map((item) => {
        return <TopicMenuItem data={item} key={item.id} />;
      })}
    </div>
  );
});
