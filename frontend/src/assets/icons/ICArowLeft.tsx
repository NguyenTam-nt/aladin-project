import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICArowLeft = ({color = Colors.text_white, width = 16, height = 30}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 1L1 15L15 29" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  )
}
