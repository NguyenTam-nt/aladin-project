import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICPre = ({color = Colors.text_black, width = 7, height = 12}:IIcon) => {
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.27824 10.8718C6.45325 10.5218 6.38465 10.0991 6.10794 9.82237L2.28557 6L6.10794 2.17763C6.38465 1.90093 6.45325 1.4782 6.27824 1.1282C6.00073 0.573168 5.26102 0.453129 4.82223 0.891916L0.421253 5.29289C0.0307283 5.68342 0.0307283 6.31658 0.421253 6.70711L4.82223 11.1081C5.26102 11.5469 6.00073 11.4268 6.27824 10.8718Z"
      fill={color}
    />
  </svg>
  )
}