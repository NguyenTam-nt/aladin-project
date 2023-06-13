import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICPlay = ({
  color = Colors.text_white,
  width = 6,
  height = 8,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00292969 0.61084V7.37884L5.33193 3.99484L0.00292969 0.61084Z"
        fill={color}
      />
    </svg>
  );
};
