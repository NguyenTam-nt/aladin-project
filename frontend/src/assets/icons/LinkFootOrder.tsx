import React from "react";
import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
const LinkFootOrder = ({
  color = Colors.Grey_Primary,
  width = 24,
  height = 24,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_826_5528"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="20"
        height="20"
      >
        <path d="M2 2H22V22H2V2Z" fill="white" />
      </mask>
      <g mask="url(#mask0_826_5528)">
        <path
          d="M12 16.7266C12 19.3154 9.90133 21.4141 7.3125 21.4141C4.72367 21.4141 2.625 19.3154 2.625 16.7266C2.625 14.1377 4.72367 12.0391 7.3125 12.0391C9.90133 12.0391 12 14.1377 12 16.7266Z"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.3125 21.4141H20.2031C20.8503 21.4141 21.375 20.8894 21.375 20.2422V6.4923L17.4689 2.58594H8.48438C7.83719 2.58594 7.3125 3.11062 7.3125 3.75781V12.0391"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.4688 2.58594V6.49219H21.375L17.4688 2.58594Z"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.4141 13.2109H18.6421"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0469 9.69531H18.6406"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.7266H18.6406"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.3125 16.7266V14.3828"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.3125 16.7266H8.875"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default LinkFootOrder;
