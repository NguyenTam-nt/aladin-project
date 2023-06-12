import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICDeleteX = ({
  color = Colors.text_white,
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.461 12.389L12.4 13.45L9.999 11.051L7.599 13.447L6.539 12.386L8.938 9.991L6.539 7.593L7.6 6.532L10 8.931L12.401 6.534L13.461 7.596L11.061 9.991L13.461 12.389ZM10 0.25C4.624 0.25 0.25 4.624 0.25 10C0.25 15.376 4.624 19.75 10 19.75C15.376 19.75 19.75 15.376 19.75 10C19.75 4.624 15.376 0.25 10 0.25Z"
        fill={color}
      />
    </svg>
  );
};
