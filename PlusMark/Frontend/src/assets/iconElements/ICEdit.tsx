import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const ICEdit = ({
    width = 24,
    height = 24,
    color = colors.gray_A1A0A3,
}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path d="M6.414 15.8897L16.556 5.74773L15.142 4.33373L5 14.4757V15.8897H6.414ZM7.243 17.8897H3V13.6467L14.435 2.21173C14.6225 2.02426 14.8768 1.91895 15.142 1.91895C15.4072 1.91895 15.6615 2.02426 15.849 2.21173L18.678 5.04073C18.8655 5.22826 18.9708 5.48257 18.9708 5.74773C18.9708 6.0129 18.8655 6.2672 18.678 6.45473L7.243 17.8897ZM3 19.8897H21V21.8897H3V19.8897Z" fill="#0073E5" />
        </svg>
    );
};

export default ICEdit;