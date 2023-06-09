import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICArrowNext = ({
  color = Colors.secondary,
  width = 8,
  height = 14,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.60003 6.19995L1.90003 0.599951C1.50003 0.199952 0.900025 0.199952 0.500025 0.599951C0.100025 0.999951 0.100025 1.59995 0.500025 1.99995L5.40003 6.99995L0.500024 12C0.100024 12.4 0.100024 13 0.500024 13.4C0.700024 13.6 0.900024 13.7 1.20002 13.7C1.50002 13.7 1.70002 13.6 1.90002 13.4L7.60002 7.79995C8.00002 7.29995 8.00003 6.69995 7.60003 6.19995C7.60003 6.29995 7.60003 6.29995 7.60003 6.19995Z"
        fill={color}
      />
    </svg>
  );
};
