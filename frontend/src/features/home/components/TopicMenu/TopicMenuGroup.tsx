import React, { memo } from "react";
import { GroupTile } from "./GroupTile";
import { TopicMenuList } from "./TopicMenuList";
import type { IProductHome } from "@typeRules/product";

type Props = {
  data: IProductHome
};

export const TopicMenuGroup = memo(({ data }: Props) => {
  return (
    <div>
      <GroupTile title={data?.category.name ?? ""} listItem={data?.category?.listCategoryChild ?? []} />
      <TopicMenuList />
    </div>
  );
});
