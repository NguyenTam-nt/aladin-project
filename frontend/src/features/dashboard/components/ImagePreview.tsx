import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { Video } from "@components/Video";
import { Colors } from "@constants/color";
import clsx from "clsx";
import React, { memo } from "react";
import YouTube from "react-youtube";

type Props = {
  isVideos?: boolean;
  url: string;
  onDelete?: () => void;
  className?: string;
  isVideoYotube?: boolean;
  optionVideo?: {
    width?: number;
    height?: number;
  }
};

export const ImagePreview = memo(
  ({ onDelete, url, isVideos = false, className = "", optionVideo, isVideoYotube = true }: Props) => {
    return url ? (
      <div className="w-full h-full relative rounded-[5px] overflow-hidden border border-text_A1A0A3">
        {!isVideos ? (
          <img
            alt=""
            src={url}
            className={clsx("w-full h-full object-cover " + className)}
          />
        ) : (
          isVideoYotube ? (
            <YouTube
              className={clsx("w-full h-full " + className)}
              videoId={url}
              opts={optionVideo}
              
            />
          ) : <Video src={url} controls muted autoPlay={false} className="w-full h-full object-cover" />
        )}
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="absolute w-[40px] h-[40px] bg-white rounded-[50%] flex justify-center items-center top-[17px] right-[17px]"
          >
            <ICDeleteTrashLight color={Colors.text_EA222A} />
          </button>
        ) : null}
      </div>
    ) : null;
  }
);
