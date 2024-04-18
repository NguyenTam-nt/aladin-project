import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const AddressWork = ({
  color = Colors.primary,
  width = 18,
  height = 18,
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
        d="M2.29004 7.77998V17.51C2.29004 19.41 3.64004 20.19 5.28004 19.25L7.63004 17.91C8.14004 17.62 8.99004 17.59 9.52004 17.86L14.77 20.49C15.3 20.75 16.15 20.73 16.66 20.44L20.99 17.96C21.54 17.64 22 16.86 22 16.22V6.48998C22 4.58998 20.65 3.80998 19.01 4.74998L16.66 6.08998C16.15 6.37998 15.3 6.40998 14.77 6.13998L9.52004 3.51998C8.99004 3.25998 8.14004 3.27998 7.63004 3.56998L3.30004 6.04998C2.74004 6.36998 2.29004 7.14998 2.29004 7.77998Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.55957 4V17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7305 6.62012V20.0001"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};