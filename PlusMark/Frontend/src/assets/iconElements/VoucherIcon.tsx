import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const VoucherIcon = ({
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
        d="M13.7105 4.83203V7.07053"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M13.7105 17.3281V19.2003"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M13.7105 14.4292V9.96973"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.25 19.4001V13.9894C20.1348 13.9894 19.2366 13.1024 19.2366 12.0011C19.2366 10.8997 20.1348 10.0117 21.25 10.0117V4.6001H2.75V10.0898C3.86525 10.0898 4.76343 10.8997 4.76343 12.0011C4.76343 13.1024 3.86525 13.9894 2.75 13.9894V19.4001H21.25Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default VoucherIcon;
