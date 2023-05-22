import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICNext = ({
  color = Colors.text_black,
  width = 11,
  height = 12,
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
        d="M0.294022 10.8718C0.119018 10.5218 0.187617 10.0991 0.464322 9.82237L4.28669 6L0.464322 2.17763C0.187617 1.90093 0.119018 1.4782 0.294022 1.1282C0.571535 0.573168 1.31125 0.453129 1.75004 0.891916L6.15101 5.29289C6.54154 5.68342 6.54154 6.31658 6.15101 6.70711L1.75004 11.1081C1.31125 11.5469 0.571535 11.4268 0.294022 10.8718Z"
        fill={color}
      />
    </svg>
  );
};
