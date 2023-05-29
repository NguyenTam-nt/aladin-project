import type { IIcon } from "typeRules/icon";
import React from "react";
import { Colors } from "@constants/color";

export const ICSuccess = ({
  color = Colors.secondary,
  width = 24,
  height = 24,
}: IIcon) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill={color} d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
    </svg>
  );
};
