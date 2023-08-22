import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const RightArrow = ({
  width = 24,
  height = 24,
  color = colors.aqua02,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
        fill={color}
      />
    </svg>
  );
};

export default RightArrow;
