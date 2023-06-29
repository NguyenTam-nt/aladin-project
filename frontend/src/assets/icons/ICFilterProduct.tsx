import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICFilterProduct = ({
  color = Colors.secondary,
  width = 20,
  height = 20,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M8.55 19V19.125H8.675H10.175H10.3V19V17.075H19H19.125V16.95V15.45V15.325H19H10.3V13.375V13.25H10.175H8.675H8.55V13.375V19ZM0.875 16.95V17.075H1H7.175H7.3V16.95V15.45V15.325H7.175H1H0.875V15.45V16.95ZM5.55 12.8V12.925H5.675H7.175H7.3V12.8V7.15V7.025H7.175H5.675H5.55V7.15V9.125H1H0.875V9.25V10.75V10.875H1H5.55V12.8ZM8.55 10.75V10.875H8.675H19H19.125V10.75V9.25V9.125H19H8.675H8.55V9.25V10.75ZM12.7 6.625V6.75H12.825H14.325H14.45V6.625V4.675H19H19.125V4.55V3.05V2.925H19H14.45V1V0.875H14.325H12.825H12.7V1V6.625ZM0.875 4.55V4.675H1H11.325H11.45V4.55V3.05V2.925H11.325H1H0.875V3.05V4.55Z"
        fill={color}
        stroke={color}
        strokeWidth="0.25"
      />
    </svg>
  );
};
