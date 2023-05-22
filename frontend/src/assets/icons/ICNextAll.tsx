import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICNextAll = ({color = Colors.text_black, width = 11, height = 12}:IIcon) => {
  return (
    <svg
          width={width}
          height={height}
          viewBox="0 0 11 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.00789 10.8718C3.83289 10.5218 3.90148 10.0991 4.17819 9.82237L8.00056 6L4.17819 2.17763C3.90148 1.90093 3.83289 1.4782 4.00789 1.1282C4.2854 0.573168 5.02512 0.453129 5.4639 0.891916L9.86488 5.29289C10.2554 5.68342 10.2554 6.31658 9.86488 6.70711L5.4639 11.1081C5.02512 11.5469 4.2854 11.4268 4.00789 10.8718Z"
            fill={color}
          />
          <rect
            x="0.000976562"
            y="0.285645"
            width="1.42857"
            height="11.4286"
            rx="0.714286"
            fill={color}
          />
        </svg>
  )
}
