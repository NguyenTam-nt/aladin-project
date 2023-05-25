import React from 'react'
import { Colors } from '@constants/color'
import type { IIcon } from '@typeRules/icon'

export const ICBanner = ({color = Colors.text_secondary, width = 20, height = 18}:IIcon) => {
  return (
    <svg width= {width} height={height} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.9918 18C0.44405 18 0 17.5551 0 17.0066V0.9934C0 0.44476 0.45531 0 0.9918 0H19.0082C19.556 0 20 0.44495 20 0.9934V17.0066C20 17.5552 19.5447 18 19.0082 18H0.9918ZM18 12V2H2V16L12 6L18 12ZM18 14.8284L12 8.8284L4.82843 16H18V14.8284ZM6 8C4.89543 8 4 7.1046 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6C8 7.1046 7.10457 8 6 8Z" fill={color}/>
    </svg>
    
    
  )
}