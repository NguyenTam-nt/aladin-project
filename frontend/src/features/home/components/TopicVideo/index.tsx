import { isUrl } from "@commons/common";
import { windownSizeHeight, windownSizeWidth } from "@constants/index";
import { useGetTopic } from "@features/dashboard/home/components/useGetTopic";
import { HomeTopicType } from "@typeRules/home";
import clsx from "clsx";
import React, { useMemo } from "react";
import YouTube from "react-youtube";

export const TopicVideo = () => {
  const { listBanner } = useGetTopic(HomeTopicType.video);

  const url = useMemo(() => {
    return listBanner?.listBanner?.[0].linkMedia || "";
  }, [listBanner]);

  return listBanner?.listBanner ? (
    <div className="banner_home">
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
