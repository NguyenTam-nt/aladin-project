import { isUrl } from "@commons/common";
import { windownSizeHeight, windownSizeWidth } from "@constants/index";
import { useGetTopic } from "@features/dashboard/home/components/useGetTopic";
import useInView from "@hooks/useInView";
import { HomeTopicType } from "@typeRules/home";
import clsx from "clsx";
import React, { useMemo } from "react";
import YouTube from "react-youtube";

export const TopicVideo = () => {
  const { listBanner } = useGetTopic(HomeTopicType.video);

  const url = useMemo(() => {
    return listBanner?.listBanner?.[0].linkMedia || "";
  }, [listBanner]);

  const {ref, isInView} = useInView<HTMLDivElement>()

  return listBanner?.listBanner ? (
    <div ref={ref} className={clsx("banner_home opacity-0 ease-in-out duration-1000", {
      "opacity-100": isInView
    })}>
      {isUrl(url) ? (
        <img className="w-full h-full object-cover" src={url} alt="" />
      ) : (
        <YouTube
          className={clsx("w-full h-full")}
          videoId={url}
          opts={{
            width: windownSizeWidth,
            height: windownSizeHeight,
          }}
        />
      )}
    </div>
  ) : null;
};
