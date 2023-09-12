import React from 'react'
import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";

export const ICFilter = ({ color = colors.black,
    width = 24,
    height = 24,
}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
