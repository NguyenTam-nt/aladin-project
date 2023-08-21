import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const ShopIcon = ({
  width = 29,
  height = 26,
  color = colors.gray03,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.7467 8.125L25.7133 13H3.28667L4.25333 8.125H24.7467ZM27.3889 0H1.61111V3.25H27.3889V0ZM27.3889 4.875H1.61111L0 13V16.25H1.61111V26H17.7222V16.25H24.1667V26H27.3889V16.25H29V13L27.3889 4.875ZM4.83333 22.75V16.25H14.5V22.75H4.83333Z"
        fill={color}
      />
    </svg>
  );
};

export default ShopIcon;