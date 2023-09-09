import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const EditLinearIcon = ({
  width = 24,
  height = 24,
  color1 = "#FF8B03",
  color2 = "#F90000",
}: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.414 15.8902L16.556 5.74822L15.142 4.33422L5 14.4762V15.8902H6.414ZM7.243 17.8902H3V13.6472L14.435 2.21222C14.6225 2.02475 14.8768 1.91943 15.142 1.91943C15.4072 1.91943 15.6615 2.02475 15.849 2.21222L18.678 5.04122C18.8655 5.22875 18.9708 5.48306 18.9708 5.74822C18.9708 6.01338 18.8655 6.26769 18.678 6.45522L7.243 17.8902ZM3 19.8902H21V21.8902H3V19.8902Z"
        fill="url(#paint0_linear_1078_30670)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1078_30670"
          x1="12"
          y1="1.91943"
          x2="12"
          y2="21.8902"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EditLinearIcon;
