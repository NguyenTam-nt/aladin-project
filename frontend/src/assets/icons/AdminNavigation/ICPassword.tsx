import React from "react";
import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";

export const ICPassword = ({
  color = Colors.text_secondary,
  width = 18,
  height = 21,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 7H17C17.5523 7 18 7.44772 18 8V20C18 20.5523 17.5523 21 17 21H1C0.44772 21 0 20.5523 0 20V8C0 7.44772 0.44772 7 1 7H3V6C3 2.68629 5.68629 0 9 0C12.3137 0 15 2.68629 15 6V7ZM2 9V19H16V9H2ZM8 13H10V15H8V13ZM4 13H6V15H4V13ZM12 13H14V15H12V13ZM13 7V6C13 3.79086 11.2091 2 9 2C6.79086 2 5 3.79086 5 6V7H13Z"
        fill={color}
      />
    </svg>
  );
};
