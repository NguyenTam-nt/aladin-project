import type { IIcon } from "typeRules/icon";
import React from "react";
import { Colors } from "@constants/color";

export const ICStarActive = ({
  color = Colors.bg_FFE600,
  width = 23,
  height = 22,
}: IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4127 17.76L4.35926 21.7082L5.93459 13.7799L0 8.2918L8.02704 7.34006L11.4127 0L14.7983 7.34006L22.8253 8.2918L16.8908 13.7799L18.4661 21.7082L11.4127 17.76Z" fill={color}/>
    </svg>
    
  );
};
