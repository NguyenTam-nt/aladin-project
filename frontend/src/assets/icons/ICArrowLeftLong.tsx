import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICArrowLeftLong = ({color = Colors.text_white, width = 148, height = 12}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 148 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M147.53 6.53033C147.823 6.23744 147.823 5.76256 147.53 5.46967L142.757 0.696699C142.464 0.403806 141.99 0.403806 141.697 0.696699C141.404 0.989593 141.404 1.46447 141.697 1.75736L145.939 6L141.697 10.2426C141.404 10.5355 141.404 11.0104 141.697 11.3033C141.99 11.5962 142.464 11.5962 142.757 11.3033L147.53 6.53033ZM0 6.75H147V5.25H0V6.75Z" fill={color} />
    </svg>
    
  )
}
