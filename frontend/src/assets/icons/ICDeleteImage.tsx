import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICDeleteImage = ({
  color = Colors.text_white,
  width = 20,
  height = 20,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6H18V19C18 19.5523 17.5523 20 17 20H3C2.44772 20 2 19.5523 2 19V6ZM5 3V1C5 0.44772 5.44772 0 6 0H14C14.5523 0 15 0.44772 15 1V3H20V5H0V3H5ZM7 2V3H13V2H7ZM7 10V16H9V10H7ZM11 10V16H13V10H11Z"
        fill={color}
      />
    </svg>
  );
};
