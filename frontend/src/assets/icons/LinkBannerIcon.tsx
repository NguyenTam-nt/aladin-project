import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

const LinkBannerIcon = ({
  color = Colors.Grey_Primary,
  width = 18.8,
  height = 18.8,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.80859 18.2113H18.4921L18.5167 18.1791L14.6269 11.6543H14.5314L11.5165 15.6551L8.17875 13.9708H8.06219L5.78906 18.1792L5.80859 18.2113Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.427 8.11195C10.427 9.17296 9.56749 10.0325 8.50648 10.0325C7.44547 10.0325 6.58594 9.17296 6.58594 8.11195C6.58594 7.05094 7.44547 6.19141 8.50648 6.19141C9.56749 6.1925 10.427 7.05094 10.427 8.11195Z"
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

export default LinkBannerIcon;
