import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICAdmin = ({
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
      <g clipPath="url(#clip0_1306_49126)">
        <path
          d="M12 14V16C10.4087 16 8.88258 16.6321 7.75736 17.7574C6.63214 18.8826 6 20.4087 6 22H4C4 19.8783 4.84285 17.8434 6.34315 16.3431C7.84344 14.8429 9.87827 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM21 17H22V22H14V17H15V16C15 15.2044 15.3161 14.4413 15.8787 13.8787C16.4413 13.3161 17.2044 13 18 13C18.7956 13 19.5587 13.3161 20.1213 13.8787C20.6839 14.4413 21 15.2044 21 16V17ZM19 17V16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16V17H19Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1306_49126">
          <rect width={width} height={height} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
