import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICClear = ({
  color = Colors.bg_7E8B99,
  width = 16,
  height = 16,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
        fill={color}
      />
    </svg>
  );
};
