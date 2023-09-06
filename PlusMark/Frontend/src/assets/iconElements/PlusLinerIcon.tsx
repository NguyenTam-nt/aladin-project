import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const PlusLinerIcon = ({
  width = 24,
  height = 24,
  color = colors.aqua02,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 12H18"
        stroke="url(#paint0_linear_1579_1611)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18V6"
        stroke="url(#paint1_linear_1579_1611)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1579_1611"
          x1="12"
          y1="12"
          x2="12"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF8B03" />
          <stop offset="1" stop-color="#F90000" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1579_1611"
          x1="12.5"
          y1="6"
          x2="12.5"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF8B03" />
          <stop offset="1" stop-color="#F90000" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PlusLinerIcon;
