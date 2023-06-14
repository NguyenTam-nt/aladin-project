import React from "react";
import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
const LinkVoucherIcon = ({
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
      <path
        d="M13.7125 4.83203V7.07053"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M13.7125 17.3281V19.2003"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M13.7125 14.4282V9.96875"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.25 19.3996V13.9889C20.1348 13.9889 19.2366 13.1019 19.2366 12.0006C19.2366 10.8992 20.1348 10.0112 21.25 10.0112V4.59961H2.75V10.0893C3.86525 10.0893 4.76343 10.8992 4.76343 12.0006C4.76343 13.1019 3.86525 13.9889 2.75 13.9889V19.3996H21.25Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default LinkVoucherIcon;
