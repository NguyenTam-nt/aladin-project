import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICHeader = ({
  color = Colors.secondary,
  width = 14,
  height = 12,
}: IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.0001 6.9142L11.793 11.7071L13.2072 10.2929L7.0001 4.0858L0.792969 10.2929L2.20718 11.7071L7.0001 6.9142ZM1.00008 0H13.0001V2H1.00008V0Z" fill={color}/>
    </svg>
    
    
  );
};
