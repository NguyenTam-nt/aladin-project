import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICDownload = ({color = Colors.text_white, width = 18, height = 19}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 17H18V19H0V17ZM10 11.1716L16.0711 5.1005L17.4853 6.51472L9 15L0.51472 6.51472L1.92893 5.1005L8 11.1716V0H10V11.1716Z" fill={color}/>
    </svg>
    
  )
}
