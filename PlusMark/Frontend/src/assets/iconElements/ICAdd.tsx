import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

export const ICAdd = ({
    color = colors.darkOrange,
    width = 24,
    height = 24,
}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path d="M6 12H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 18V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
