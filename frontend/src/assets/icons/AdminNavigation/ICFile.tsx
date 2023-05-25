import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICFile = ({color = Colors.text_secondary, width = 18, height = 20}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0.00318003V0H16.9978C17.5513 0 18 0.45531 18 0.9918V19.0082C18 19.556 17.5551 20 17.0066 20H0.9934C0.44476 20 0 19.5501 0 18.9932V6L6 0.00318003ZM2.82918 6H6V2.83086L2.82918 6ZM8 2V7C8 7.55228 7.5523 8 7 8H2V18H16V2H8Z" fill={color}/>
    </svg>
    
    
    
    
  )
}