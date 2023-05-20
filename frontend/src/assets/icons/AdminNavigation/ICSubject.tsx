import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICSubject = ({color = Colors.text_secondary, width = 20, height = 20}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 18V20H9V18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0H7C8.1947 0 9.2671 0.52375 10 1.35418C10.7329 0.52375 11.8053 0 13 0H19C19.5523 0 20 0.44772 20 1V17C20 17.5523 19.5523 18 19 18H11ZM18 16V2H13C11.8954 2 11 2.89543 11 4V16H18ZM9 16V4C9 2.89543 8.1046 2 7 2H2V16H9Z" fill={color}/>
    </svg>
    
    
    
  )
}
