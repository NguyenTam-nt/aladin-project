import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICDeleteTrash = ({
  color = Colors.bg_E73F3F,
  width = 16,
  height = 20,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25008 15.5329H8.75008V9.37285H7.25008V15.5329ZM0.0800781 5.03285L1.50008 19.8729H14.5001L15.9201 5.03285H0.0800781Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9381 1.56195H12.3571V0.126953H3.64307V1.56195H2.06207V3.06195H13.9381V1.56195Z"
        fill={color}
      />
    </svg>
  );
};
