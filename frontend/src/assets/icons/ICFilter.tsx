import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICFilter = ({
  color = Colors.secondary,
  width = 18,
  height = 18,
}: IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0V2H17L12 9.5V18H6V9.5L1 2H0V0H18ZM3.4037 2L8 8.8944V16H10V8.8944L14.5963 2H3.4037Z" fill={color}/>
    </svg>
    
  );
};
