import type { IIcon } from "typeRules/icon";
import React from "react";
import { Colors } from "@constants/color";

export const ICCheck = ({
  color = Colors.text_black,
  width = 16,
  height = 16,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
      ></path>
    </svg>
  );
};
