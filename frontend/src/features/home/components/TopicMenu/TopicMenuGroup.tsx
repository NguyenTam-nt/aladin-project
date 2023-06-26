import React, { memo } from "react";
import { GroupTile } from "./GroupTile";
import { TopicMenuList } from "./TopicMenuList";
import type { IProductHome } from "@typeRules/product";

type Props = {
  data: IProductHome;
};

export const TopicMenuGroup = memo(({ data }: Props) => {
  return data?.listProduct.length ? (
    <div>
      <GroupTile
        idParent={Number(data?.category?.id)}
        title={data?.category.name ?? ""}
        listItem={data?.category?.listCategoryChild ?? []}
      />
      <TopicMenuList products={data?.listProduct ?? []} />
    </div>
  ) : null;
});
