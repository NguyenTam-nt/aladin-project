import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
import React from "react";

export const ICEye = ({
  color = Colors.text_white,
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
        d="M14.0009 12C14.0009 13.1046 13.1054 14 12.0009 14C10.8963 14 10.0009 13.1046 10.0009 12C10.0009 10.8954 10.8963 10 12.0009 10C13.1054 10 14.0009 10.8954 14.0009 12Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0009 3C6.40934 3 1.71104 6.82432 0.378906 12C1.71104 17.1757 6.40934 21 12.0009 21C17.5924 21 22.2907 17.1757 23.6228 12C22.2907 6.82432 17.5924 3 12.0009 3ZM16.0009 12C16.0009 14.2091 14.21 16 12.0009 16C9.79172 16 8.00085 14.2091 8.00085 12C8.00085 9.79086 9.79172 8 12.0009 8C14.21 8 16.0009 9.79086 16.0009 12Z"
        fill={color}
      />
    </svg>
  );
};
