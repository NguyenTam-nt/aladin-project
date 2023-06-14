import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
import React from "react";

const LinkStarIcon = ({
  color = Colors.Grey_Primary,
  width = 20,
  height = 18,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7289 2.51063L15.4889 6.03063C15.7289 6.52063 16.3689 6.99063 16.9089 7.08063L20.0989 7.61062C22.1389 7.95062 22.6189 9.43062 21.1489 10.8906L18.6689 13.3706C18.2489 13.7906 18.0189 14.6006 18.1489 15.1806L18.8589 18.2506C19.4189 20.6806 18.1289 21.6206 15.9789 20.3506L12.9889 18.5806C12.4489 18.2606 11.5589 18.2606 11.0089 18.5806L8.01893 20.3506C5.87893 21.6206 4.57893 20.6706 5.13893 18.2506L5.84893 15.1806C5.97893 14.6006 5.74893 13.7906 5.32893 13.3706L2.84893 10.8906C1.38893 9.43062 1.85893 7.95062 3.89893 7.61062L7.08893 7.08063C7.61893 6.99063 8.25893 6.52063 8.49893 6.03063L10.2589 2.51063C11.2189 0.600625 12.7789 0.600625 13.7289 2.51063Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinkStarIcon;
