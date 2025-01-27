import React from "react";
import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";

const LinkCommentIcon = ({
  color = Colors.Grey_Primary,
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
      <path d="M15 7H5V5H15V7Z" fill={color} />
      <path d="M5 11H15V9H5V11Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 16V0H20V16H14V20H12C9.79086 20 8 18.2091 8 16H0ZM10 14V16C10 17.1046 10.8954 18 12 18V14H18V2H2V14H10Z"
        fill={color}
      />
    </svg>
  );
};

export default LinkCommentIcon;
