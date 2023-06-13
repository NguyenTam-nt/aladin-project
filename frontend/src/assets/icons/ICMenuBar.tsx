import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICMenuBar = ({
  color = Colors.text_white,
  width = 16,
  height = 14,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1Z"
        fill={color}
      />
      <path
        d="M0 13C0 12.4477 0.447715 12 1 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H1C0.447715 14 0 13.5523 0 13Z"
        fill={color}
      />
      <path
        d="M7 6C6.44772 6 6 6.44771 6 7C6 7.55228 6.44772 8 7 8H15C15.5523 8 16 7.55228 16 7C16 6.44771 15.5523 6 15 6H7Z"
        fill={color}
      />
    </svg>
  );
};
