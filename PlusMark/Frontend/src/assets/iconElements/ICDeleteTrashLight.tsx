import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

export const ICDeleteTrashLight = ({
  color = colors.cancel_color,
  width = 24,
  height = 24,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.625 7.40234H19.3726L18.0464 21.2497H5.95124L4.625 7.40234Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M7.8125 2.75H16.1892"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M12 12L12 16.653"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};
