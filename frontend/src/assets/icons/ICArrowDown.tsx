import type { IIcon } from 'typeRules/icon'
import React from 'react'
import { Colors } from '@constants/color'

export const ICArrowDown = ({color = Colors.text_primary, width = 24, height = 24}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
