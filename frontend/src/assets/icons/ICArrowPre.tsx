import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICArrowPre = ({
  color = Colors.text_A1A0A3,
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
        d="M0.499997 7.80005L6.2 13.4C6.6 13.8 7.2 13.8 7.6 13.4C8 13 8 12.4 7.6 12L2.7 7.00005L7.6 2.00005C8 1.60005 8 1.00005 7.6 0.600049C7.4 0.400049 7.2 0.300049 6.9 0.300049C6.6 0.300049 6.4 0.400049 6.2 0.600049L0.499997 6.20005C0.099997 6.70005 0.099997 7.30005 0.499997 7.80005C0.499997 7.70005 0.499997 7.70005 0.499997 7.80005Z"
        fill={color}
      />
    </svg>
  );
};
