import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICArrowRightNext = ({
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
        d="M24.0756 0.68634L21.2538 3.52138L27.7943 10.0313L0.584229 10.0587L0.588254 14.0587L27.7238 14.0314L21.2935 20.4918L24.1285 23.3136L35.4158 11.9735L24.0756 0.68634Z"
        fill={color}
      />
    </svg>
  );
};
