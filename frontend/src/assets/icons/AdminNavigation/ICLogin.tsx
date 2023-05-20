import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICLogin = ({color = Colors.text_secondary, width = 21, height = 20}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 9V6L14 10L9 14V11H0V9H9ZM1.4578 13H3.58152C4.76829 15.9318 7.64262 18 11 18C15.4183 18 19 14.4183 19 10C19 5.58172 15.4183 2 11 2C7.64262 2 4.76829 4.06817 3.58152 7H1.4578C2.73207 2.94289 6.52236 0 11 0C16.5228 0 21 4.47715 21 10C21 15.5228 16.5228 20 11 20C6.52236 20 2.73207 17.0571 1.4578 13Z" fill={color}/>
    </svg>
    
    
  )
}
