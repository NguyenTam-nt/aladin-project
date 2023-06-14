import React from "react";
import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
const LinkTableIcon = ({
  color = Colors.Grey_Primary,
  width = 20,
  height = 20,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6875 8.59375H5.3125V6.25H14.6875V8.59375Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <mask
        id="mask0_826_5497"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <path d="M0 0H20V20H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_826_5497)">
        <path
          d="M0.582031 3.90625C0.582031 3.90625 1.76172 10.6445 1.76172 16.2109"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M6.48438 13.2812V16.2109"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M6.48438 13.2812H1.75781V12.1094C1.75781 10.815 2.84621 10.9375 4.14062 10.9375C5.43504 10.9375 6.48438 10.815 6.48438 12.1094V13.2812Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M0.582031 3.90625C0.582031 3.90625 1.76172 10.6445 1.76172 16.2109"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M6.48438 13.2812V16.2109"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M19.4219 3.90625C19.4219 3.90625 18.2422 10.6445 18.2422 16.2109"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M13.5156 13.2812V16.2109"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M10 8.59375V15.625"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M8.24219 15.625H11.7578"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M18.2422 13.2812H13.5156V12.1094C13.5156 10.815 14.565 10.9375 15.8594 10.9375C17.1538 10.9375 18.2422 10.815 18.2422 12.1094V13.2812Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
};

export default LinkTableIcon;
