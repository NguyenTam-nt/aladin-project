import React, { memo } from "react";
import { GroupTile } from "./GroupTile";
import { TopicMenuList } from "./TopicMenuList";

type Props = {
  title: string;
  listItem: string[];
};

export const TopicMenuGroup = memo(({ title, listItem }: Props) => {
  return (
    <div>
      <GroupTile title={title} listItem={listItem} />
      <TopicMenuList />
    </div>
  );
});
