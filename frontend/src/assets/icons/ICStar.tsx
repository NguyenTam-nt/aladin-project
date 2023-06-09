import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICStar = ({
  color = Colors.text_A1A0A3,
  width = 14,
  height = 14,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9457 8.54675C10.773 8.71408 10.6937 8.95608 10.733 9.19341L11.3257 12.4734C11.3757 12.7514 11.2583 13.0327 11.0257 13.1934C10.7977 13.3601 10.4943 13.3801 10.2457 13.2467L7.29299 11.7067C7.19032 11.6521 7.07632 11.6227 6.95965 11.6194H6.77899C6.71632 11.6287 6.65499 11.6487 6.59899 11.6794L3.64565 13.2267C3.49965 13.3001 3.33432 13.3261 3.17232 13.3001C2.77765 13.2254 2.51432 12.8494 2.57899 12.4527L3.17232 9.17275C3.21165 8.93341 3.13232 8.69008 2.95965 8.52008L0.552319 6.18675C0.350986 5.99141 0.280986 5.69808 0.372986 5.43341C0.462319 5.16941 0.690319 4.97675 0.965653 4.93341L4.27899 4.45275C4.53099 4.42675 4.75232 4.27341 4.86565 4.04675L6.32565 1.05341C6.36032 0.986748 6.40499 0.925415 6.45899 0.873415L6.51899 0.826748C6.55032 0.792081 6.58632 0.763415 6.62632 0.740081L6.69899 0.713415L6.81232 0.666748H7.09299C7.34365 0.692748 7.56432 0.842748 7.67965 1.06675L9.15899 4.04675C9.26565 4.26475 9.47299 4.41608 9.71232 4.45275L13.0257 4.93341C13.3057 4.97341 13.5397 5.16675 13.6323 5.43341C13.7197 5.70075 13.6443 5.99408 13.439 6.18675L10.9457 8.54675Z"
        fill={color}
      />
    </svg>
  );
};
