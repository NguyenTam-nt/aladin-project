import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICFacebook = ({
  color = "#337FFF",
  width = 8,
  height = 13,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.93684 6.78097L7.27879 4.60832H5.17236V3.1961C5.17236 2.60202 5.46644 2.02151 6.40681 2.02151H7.37796V0.171365C6.81241 0.0811806 6.24095 0.0323909 5.66819 0.0253906C3.93449 0.0253906 2.80263 1.06758 2.80263 2.95168V4.60832H0.880859V6.78097H2.80263V12.0361H5.17236V6.78097H6.93684Z"
        fill={color}
      />
    </svg>
  );
};
