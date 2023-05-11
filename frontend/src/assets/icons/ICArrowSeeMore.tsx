import { Colors } from '@constants/color'
import type { IIcon } from '@types/icon'
import React from 'react'

export const ICArrowSeeMore = ({color = Colors.text_white, width = 67, height = 12}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 67 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M66.5303 6.53033C66.8232 6.23744 66.8232 5.76256 66.5303 5.46967L61.7574 0.696699C61.4645 0.403806 60.9896 0.403806 60.6967 0.696699C60.4038 0.989593 60.4038 1.46447 60.6967 1.75736L64.9393 6L60.6967 10.2426C60.4038 10.5355 60.4038 11.0104 60.6967 11.3033C60.9896 11.5962 61.4645 11.5962 61.7574 11.3033L66.5303 6.53033ZM0 6.75H66V5.25H0V6.75Z" fill={color}/>
    </svg>
    
  )
}
