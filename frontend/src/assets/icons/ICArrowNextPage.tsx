
import { Colors } from '@constants/color'
import type { IIcon } from '@types/icon'
import React from 'react'

export const ICArrowNextPage = ({
  color = Colors.text_black,
  width = 24,
  height = 24,
}: IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 17L18 12L13 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 17L11 12L6 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};


