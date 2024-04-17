import React, { memo } from "react"
import type { newItem_type } from "@typeRules/new"
import { Link } from "react-router-dom"
import { pathsAdmin } from "@constants/routerManager"
import { convertToSlugFunc, getLinkImageUrl } from "@commons/common"
import { Image } from "@components/Image"

type Props = {
  data: newItem_type
}

export const TopicNewsItem = memo(({ data }: Props) => {
  return (
    <Link
      to={`/${pathsAdmin.news.prefix}/${convertToSlugFunc(
        data.title,
        data.id ?? 0
      )}`}
      className="radius-tl-br h-[302px] flex flex-col overflow-hidden bg-white"
    >
      <div className="h-[176px]">
        <Image
          className="w-full h-full object-cover"
          alt={getLinkImageUrl(data?.linkMedia, 350, 176)}
          loading="lazy"
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
  )
})
