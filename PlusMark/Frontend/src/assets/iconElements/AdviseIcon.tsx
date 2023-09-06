import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const AdviseIcon = ({
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
        d="M2.625 2.625C2.625 15.375 8.625 21.375 21.375 21.375V15.375L16.125 13.875L14.625 16.125C11.625 16.125 7.875 12.375 7.875 9.375L10.125 7.875L8.625 2.625H2.625Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AdviseIcon;
