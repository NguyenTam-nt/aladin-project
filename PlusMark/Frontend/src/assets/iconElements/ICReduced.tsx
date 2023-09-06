import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const ICReduced = ({
    width = 16,
    height = 10,
    color = colors.gray_A1A0A3,
}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 10" fill="none">
            <path d="M1 1L5.5 5.5L8.5 2.5L15 9M15 9V2.5M15 9H8.5" stroke="#EE0000" strokeWidth="1.6" />
        </svg>
    );
};

export default ICReduced;