import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICHotline = ({
  color = Colors.text_EA222A,
  width = 16,
  height = 16,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.863 10.5425L10.4088 11.955C9.9755 11.805 8.72967 11.3025 7.5905 10.1633C6.52134 9.09418 6.07467 7.91335 5.94384 7.50085L7.35967 5.04168L4.27884 0.80835L3.95384 1.00002C2.6355 1.77335 1.66717 2.74002 0.90967 4.04335L0.861337 4.17585C0.433004 6.46168 1.7405 9.83168 4.11467 12.5617C6.6905 15.5233 10.033 17.1917 13.353 17.1917C13.503 17.1917 13.653 17.1892 13.803 17.1817L13.9022 17.1775L13.988 17.1292C15.323 16.3808 16.293 15.4108 17.0405 14.0758L17.2197 13.755L12.863 10.5425Z"
        fill={color}
      />
    </svg>
  );
};
