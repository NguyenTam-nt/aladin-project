import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICSave = ({color = Colors.text_white, width = 19, height = 18}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 16V10H14.5V16H16.5V4.82843L13.6716 2H2.5V16H4.5ZM1.5 0H14.5L18.5 4V17C18.5 17.5523 18.0523 18 17.5 18H1.5C0.94772 18 0.5 17.5523 0.5 17V1C0.5 0.44772 0.94772 0 1.5 0ZM6.5 12V16H12.5V12H6.5Z" fill={color}/>
    </svg>
    
    
  )
}
