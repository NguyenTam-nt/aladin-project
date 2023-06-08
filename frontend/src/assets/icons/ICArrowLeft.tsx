import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICArowLeft = ({
  color = Colors.text_5A5C60,
  width = 36,
  height = 24,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9244 23.3137L14.7462 20.4786L8.2057 13.9687L35.4158 13.9413L35.4117 9.94131L8.27623 9.96862L14.7065 3.50815L11.8715 0.686352L0.584214 12.0265L11.9244 23.3137Z"
        fill={color}
      />
    </svg>
  );
};
