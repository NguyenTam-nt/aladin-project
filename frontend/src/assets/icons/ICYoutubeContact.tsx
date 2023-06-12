import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICYoutubeContact = ({
  color = Colors.text_FF0000,
  width = 29,
  height = 20,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.9061 3.12273C27.5796 1.89545 26.6139 0.927273 25.3852 0.595455C23.1636 2.16744e-07 14.25 0 14.25 0C14.25 0 5.34092 2.16744e-07 3.11478 0.595455C1.89063 0.922728 0.924913 1.89091 0.593939 3.12273C0 5.35 0 10 0 10C0 10 0 14.65 0.593939 16.8773C0.920379 18.1045 1.8861 19.0727 3.11478 19.4045C5.34092 20 14.25 20 14.25 20C14.25 20 23.1636 20 25.3852 19.4045C26.6094 19.0773 27.5751 18.1091 27.9061 16.8773C28.5 14.65 28.5 10 28.5 10C28.5 10 28.5 5.35 27.9061 3.12273Z"
        fill="white"
      />
      <path
        d="M11.4027 14.2864L18.8066 10L11.4027 5.71364V14.2864Z"
        fill={color}
      />
    </svg>
  );
};
