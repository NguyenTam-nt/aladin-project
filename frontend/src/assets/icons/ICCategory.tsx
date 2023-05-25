import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICCategory = ({
  color = Colors.secondary,
  width = 19,
  height = 17,
}: IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0H19V2H11V0ZM11 7H19V9H11V7ZM11 14H19V16H11V14ZM4.5 15C3.39543 15 2.5 14.1046 2.5 13C2.5 11.8954 3.39543 11 4.5 11C5.60457 11 6.5 11.8954 6.5 13C6.5 14.1046 5.60457 15 4.5 15ZM4.5 17C6.70914 17 8.5 15.2091 8.5 13C8.5 10.7909 6.70914 9 4.5 9C2.29086 9 0.5 10.7909 0.5 13C0.5 15.2091 2.29086 17 4.5 17ZM3 2V5H6V2H3ZM1 0H8V7H1V0Z" fill={color}/>
    </svg>
    
    
  );
};
