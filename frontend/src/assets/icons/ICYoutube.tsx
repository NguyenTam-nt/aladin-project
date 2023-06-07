import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICYoutube = ({ width = 14, height = 10 }: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6752 1.69813C13.5185 1.10904 13.0549 0.64431 12.4652 0.485037C11.3988 0.199219 7.12027 0.199219 7.12027 0.199219C7.12027 0.199219 2.84391 0.199219 1.77537 0.485037C1.18778 0.642128 0.724231 1.10686 0.565364 1.69813C0.280273 2.76722 0.280273 4.99922 0.280273 4.99922C0.280273 4.99922 0.280273 7.23122 0.565364 8.30031C0.722055 8.8894 1.1856 9.35413 1.77537 9.5134C2.84391 9.79922 7.12027 9.79922 7.12027 9.79922C7.12027 9.79922 11.3988 9.79922 12.4652 9.5134C13.0528 9.35631 13.5163 8.89158 13.6752 8.30031C13.9603 7.23122 13.9603 4.99922 13.9603 4.99922C13.9603 4.99922 13.9603 2.76722 13.6752 1.69813Z"
        fill="#FF0000"
      />
      <path
        d="M5.75358 7.05667L9.30742 4.99922L5.75358 2.94176V7.05667Z"
        fill="white"
      />
    </svg>
  );
};