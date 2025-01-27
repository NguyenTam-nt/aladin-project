import { isUrl } from "@commons/common"
import { Image } from "@components/Image"
import {
  windownSizeHeight,
  windownSizeWidth,
  withResponsive,
} from "@constants/index"
import { useGetTopic } from "@features/dashboard/home/components/useGetTopic"
import useInView from "@hooks/useInView"
import { HomeTopicType } from "@typeRules/home"
import clsx from "clsx"
import React, { useMemo } from "react"
import YouTube from "react-youtube"

export const TopicVideo = () => {
  const { listBanner } = useGetTopic(HomeTopicType.video)

  const url = useMemo(() => {
    return listBanner?.listBanner?.[0].linkMedia || ""
  }, [listBanner])

  const { ref, isInView } = useInView<HTMLDivElement>()

  return listBanner?.listBanner?.length ? (
    <div
      ref={ref}
      className={clsx("opacity-0 ease-in-out duration-1000", {
        "opacity-100": isInView,
      })}
    >
      {url ? (
        isUrl(url) ? (
          <Image alt={url} className="w-full h-full object-cover" />
        ) : (
          <YouTube
            className={clsx("w-full h-full object-cover")}
            videoId={url}
            opts={{
              width: windownSizeWidth,
              height:
                windownSizeWidth > withResponsive._1024
                  ? windownSizeHeight
                  : windownSizeHeight / 2,
            }}
          />
        )
      ) : null}
    </div>
  ) : null
}
