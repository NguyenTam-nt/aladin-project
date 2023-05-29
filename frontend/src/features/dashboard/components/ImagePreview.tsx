import { ICDeleteImage } from "@assets/icons/ICDeleteImage";
import { ICStarActive } from "@assets/icons/ICStarActive";
import { isUrl } from "@commons/index";
import { Colors } from "@constants/color";
import clsx from "clsx";
import React, { memo } from "react";

type Props = {
  isActive?: boolean;
  isVideos?: boolean;
  url: string;
  onActive?: () => void;
  onDelete?: () => void;
  className?: string;
};

export const ImagePreview = memo(
  ({
    isActive,
    onActive,
    onDelete,
    url,
    isVideos = false,
    className = "",
  }: Props) => {
    console.log({i: isUrl(url)})
    return isUrl(url) ? (
      <div className="w-full h-full relative rounded-[5px] overflow-hidden border border-br_E9ECEF">
        {onActive ? (
          <button
            onClick={onActive}
            className="absolute top-[17px] left-[17px]"
          >
            <ICStarActive
              color={isActive ? Colors.bg_FFE600 : Colors.text_white}
            />
          </button>
        ) : null}
        {!isVideos ? (
          <img
            alt=""
            src={url}
            className={clsx("w-full h-full object-cover " + className)}
          />
        ) : (
          <video  className="w-full h-full object-cover" muted={true} autoPlay>
            <source src={url} />
          </video>
        )}
        {onDelete ? (
          <button
            onClick={onDelete}
            className="absolute top-[17px] right-[17px]"
          >
            <ICDeleteImage />
          </button>
        ) : null}
      </div>
    ) : null;
  }
);
