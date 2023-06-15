import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { Colors } from "@constants/color";
import clsx from "clsx";
import React, { memo } from "react";
import YouTube from "react-youtube";

type Props = {
  isVideos?: boolean;
  url: string;
  onDelete?: () => void;
  className?: string;
  optionVideo?: {
    width?: number;
    height?: number;
  }
};

export const ImagePreview = memo(
  ({ onDelete, url, isVideos = false, className = "", optionVideo }: Props) => {
    return url ? (
      <div className="w-full h-full relative rounded-[5px] overflow-hidden border border-text_A1A0A3">
        {!isVideos ? (
          <img
            alt=""
            src={url}
            className={clsx("w-full h-full object-cover " + className)}
          />
        ) : (
          <YouTube
            className={clsx("w-full h-full " + className)}
            videoId={url}
            opts={optionVideo}
            
          />
        )}
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="absolute top-[17px] right-[17px]"
          >
            <ICDeleteTrashLight color={Colors.text_white} />
          </button>
        ) : null}
      </div>
    ) : null;
  }
);
