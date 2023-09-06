import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const BannerIcon = ({
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
      <path
        d="M5.80762 18.2103H18.4911L18.5157 18.1781L14.6259 11.6533H14.5304L11.5155 15.6542L8.17777 13.9698H8.06122L5.78809 18.1782L5.80762 18.2103Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.428 8.11195C10.428 9.17296 9.56847 10.0325 8.50746 10.0325C7.44645 10.0325 6.58691 9.17296 6.58691 8.11195C6.58691 7.05094 7.44645 6.19141 8.50746 6.19141C9.56847 6.1925 10.428 7.05094 10.428 8.11195Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.25 21.25L21.25 2.75L2.75 2.75L2.75 21.25L21.25 21.25Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BannerIcon;
