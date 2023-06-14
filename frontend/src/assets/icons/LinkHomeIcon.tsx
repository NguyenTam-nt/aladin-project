import React from "react";
import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
const LinkHomeIcon = ({
  color = Colors.Grey_Primary,
  width = 22,
  height = 22,
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
        d="M1.93359 11.3755L11.9998 2.75L22.0659 11.3755"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M4.09375 10.1602V21.2511H19.9113V10.1602"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M12 12.7051L12 16.1135"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default LinkHomeIcon;
