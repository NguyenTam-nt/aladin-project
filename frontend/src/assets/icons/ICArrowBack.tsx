import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICArowBack = ({color = Colors.text_white, width = 28, height = 26}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.04673 11.3341H27.3327V14.6675H7.04673L15.9867 23.6073L13.6297 25.9643L0.666016 13.0008L13.6297 0.0371094L15.9867 2.39413L7.04673 11.3341Z" fill={color}/>
    </svg>
  )
}
