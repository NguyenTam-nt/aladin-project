import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const SuccesedIcon = ({
  width = 24,
  height = 24,
  color = colors.darkGreen,
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
        d="M22 5.18001L10.59 16.6L6.35 12.36L7.76 10.95L10.59 13.78L20.59 3.78001L22 5.18001ZM19.79 10.22C19.92 10.79 20 11.39 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58001 7.58 4.00001 12 4.00001C13.58 4.00001 15.04 4.46001 16.28 5.25001L17.72 3.81001C16.0464 2.62956 14.048 1.99718 12 2.00001C6.48 2.00001 2 6.48001 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.81 21.78 9.67001 21.4 8.61001L19.79 10.22Z"
        fill={color}
      />
    </svg>
  );
};

export default SuccesedIcon;
