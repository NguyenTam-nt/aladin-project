import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import clsx from "clsx";
import React, { memo } from "react";

type Props = {
  isVideos?: boolean;
  url: string;
  onDelete?: () => void;
  className?: string;
  position?: boolean;
  isVideoYotube?: boolean;
  optionVideo?: {
    width?: number;
    height?: number;
  };
  rounded?: boolean;
  multiple?: boolean;
  alt?: string;
};

export const ImagePreview = memo(
  ({
    onDelete,
    url,
    isVideos = false,
    className = "",
    position = false,
    optionVideo,
    isVideoYotube = true,
    rounded = true,
    multiple = false,
    alt,
  }: Props) => {
    return url ? (
      <div
        className={clsx(
          "w-full h-full relative overflow-hidden border border-l-gray-300 rounded-sm ",
          {
            "rounded-sm": rounded,
            "!w-[288px]": multiple,
          },
          className
        )}
      >
        <img
          alt={alt}
          src={url}
          className={clsx("w-full h-full object-cover ", {
            "!w-[288px]": multiple,
          })}
        />
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className={clsx(
              "absolute w-[40px] h-[40px]  flex justify-center items-center ",
              {
                "top-[17px] right-[17px]": !position,
                "top-0 right-0": position,
              }
            )}
          >
            <ICDeleteTrashLight />
          </button>
        ) : null}
      </div>
    ) : null;
  }
);
