import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
import React from "react";

export const ICFilter = ({
  color = Colors.TrueBlue500,
  width = 22,
  height = 20,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
