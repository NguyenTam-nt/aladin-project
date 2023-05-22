import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICPreAll = ({color = Colors.text_black, width = 11, height = 12}:IIcon) => {
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 11 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.56438 10.8718C6.73938 10.5218 6.67078 10.0991 6.39408 9.82237L2.57171 6L6.39408 2.17763C6.67078 1.90093 6.73938 1.4782 6.56438 1.1282C6.28686 0.573168 5.54715 0.453129 5.10836 0.891916L0.707386 5.29289C0.316861 5.68342 0.316861 6.31658 0.707386 6.70711L5.10836 11.1081C5.54715 11.5469 6.28686 11.4268 6.56438 10.8718Z"
      fill={color}
    />
    <rect
      width="1.42857"
      height="11.4286"
      rx="0.714286"
      transform="matrix(-1 0 0 1 10.5713 0.285645)"
      fill={color}
    />
  </svg>
  )
}
