import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICFooter = ({
  color = Colors.secondary,
  width = 14,
  height = 13,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.0001 5.08981L2.20718 0.296875L0.792969 1.71108L7.0001 7.9182L13.2072 1.71108L11.793 0.296875L7.0001 5.08981ZM13.0001 12.004H1.00007V10.004H13.0001V12.004Z"
        fill={color}
      />
    </svg>
  );
};
