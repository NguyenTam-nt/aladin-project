import React, { memo } from "react";
import type { newItem_type } from "@typeRules/new";
import { Link } from "react-router-dom";
import { pathsAdmin } from "@constants/routerManager";

type Props = {
  data: newItem_type
}

export const TopicNewsItem = memo(({data}:Props) => {
  return (
    <Link to={`${pathsAdmin.news.prefix}/${data.id}`} className="radius-tl-br h-[302px] flex flex-col overflow-hidden bg-white">
      <div className="h-[176px]">
        <img
          className="w-full h-full object-cover"
          alt=""
          src={data?.linkMedia}
        />
      </div>
      <div className="px-[16px] flex-1 py-[24px]">
        <p className="text-_16 font-semibold text-GreyPrimary line-clamp-2">
          {data?.title}
        </p>
        <p className="text-_14 mt-1 font-normal text-text_secondary">
          {new Date(data?.createdDate ?? "").toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
})
