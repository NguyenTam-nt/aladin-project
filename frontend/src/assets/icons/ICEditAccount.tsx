import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICEditAccount = ({
  color = Colors.secondary,
  width = 23,
  height = 26,
}: IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 23 26" fill="none">
      <path
        d="M19.3584 0.753906L22.9922 4.69184L20.222 7.69517L16.5882 3.75724L19.3584 0.753906ZM6.04883 19.1152H9.68268L18.5093 9.54994L14.8754 5.61201L6.04883 15.1773V19.1152Z"
        fill={color}
      />
      <path
        d="M19.3805 23.0531H6.24779C6.2163 23.0531 6.1836 23.0662 6.1521 23.0662C6.11213 23.0662 6.07216 23.0544 6.03098 23.0531H2.42256V4.67607H10.7162L13.1388 2.05078H2.42256C1.08652 2.05078 0 3.22691 0 4.67607V23.0531C0 24.5023 1.08652 25.6784 2.42256 25.6784H19.3805C20.023 25.6784 20.6392 25.4018 21.0935 24.9095C21.5478 24.4171 21.8031 23.7494 21.8031 23.0531V11.6751L19.3805 14.3004V23.0531Z"
        fill={color}
      />
    </svg>
  );
};
