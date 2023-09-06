import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const IntroduceIcon = ({
  width = 19,
  height = 20,
  color = colors.black02,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 20"
      fill="none"
    >
      <path
        d="M16.5833 1.5H2.41667C1.63426 1.5 1 2.13426 1 2.91667V17.0833C1 17.8657 1.63426 18.5 2.41667 18.5H16.5833C17.3657 18.5 18 17.8657 18 17.0833V2.91667C18 2.13426 17.3657 1.5 16.5833 1.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M1 6.69482H18M6.19444 18.5004V6.69482"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IntroduceIcon;
