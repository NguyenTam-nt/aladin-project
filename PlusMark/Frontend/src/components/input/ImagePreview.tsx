import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import clsx from "clsx";
import React, { memo } from "react";

type Props = {
  isVideos?: boolean;
  url: string;
  onDelete?: () => void;
  className?: string;
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
          }
        )}
      >
        <img
          alt={alt}
          src={url}
          className={clsx("w-full h-full object-cover " + className, {
            "!w-[288px]": multiple,
          })}
        />
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="absolute w-[40px] h-[40px]  flex justify-center items-center top-[17px] right-[17px]"
          >
            <ICDeleteTrashLight />
          </button>
        ) : null}
      </div>
    ) : null;
  }
);
