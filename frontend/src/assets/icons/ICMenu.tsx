import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICMenu = ({color = Colors.text_secondary, width = 24, height = 24}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  )
}
