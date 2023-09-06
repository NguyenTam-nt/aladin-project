import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const ProductIcon = ({
  width = 24,
  height = 24,
  color = colors.black02,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M17 9H7V7H17V9Z" fill="url(#paint0_linear_1751_17501)" />
      <path d="M7 13H17V11H7V13Z" fill="url(#paint1_linear_1751_17501)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 18V2H22V18H16V22H14C11.7909 22 10 20.2091 10 18H2ZM12 16V18C12 19.1046 12.8954 20 14 20V16H20V4H4V16H12Z"
        fill="url(#paint2_linear_1751_17501)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1751_17501"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1751_17501"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1751_17501"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ProductIcon;
