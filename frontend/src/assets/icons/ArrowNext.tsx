import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ArrowNext = ({
  color = Colors.text_5F5F61,
  width = 5,
  height = 10,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11L6 6L1 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
