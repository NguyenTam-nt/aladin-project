import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICNotice = ({color = Colors.text_secondary, width = 20, height = 19}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 14C6 14 13 15 16 18H17C17.5523 18 18 17.5523 18 17V10.937C18.8626 10.715 19.5 9.9319 19.5 9C19.5 8.0681 18.8626 7.285 18 7.063V1C18 0.44772 17.5523 0 17 0H16C13 3 6 4 6 4H2C0.89543 4 0 4.89543 0 6V12C0 13.1046 0.89543 14 2 14H3L4 19H6V14ZM8 5.6612C8.6833 5.5146 9.5275 5.31193 10.4393 5.04373C12.1175 4.55014 14.25 3.77262 16 2.57458V15.4254C14.25 14.2274 12.1175 13.4499 10.4393 12.9563C9.5275 12.6881 8.6833 12.4854 8 12.3388V5.6612ZM2 6H6V12H2V6Z" fill={color}/>
    </svg>
    
    
    
  )
}
