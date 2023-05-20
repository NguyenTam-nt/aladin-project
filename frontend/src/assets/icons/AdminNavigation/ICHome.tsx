import React from 'react'
import { Colors } from '@constants/color'
import type { IIcon } from '@typeRules/icon'

export const ICHome = ({color = Colors.text_secondary, width = 18, height = 19}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 16.9987H16V7.97693L9 2.53248L2 7.97693V16.9987H8V10.9987H10V16.9987ZM18 17.9987C18 18.551 17.5523 18.9987 17 18.9987H1C0.44772 18.9987 0 18.551 0 17.9987V7.48784C0 7.17925 0.14247 6.88795 0.38606 6.69849L8.3861 0.47627C8.7472 0.19541 9.2528 0.19541 9.6139 0.47627L17.6139 6.69849C17.8575 6.88795 18 7.17925 18 7.48784V17.9987Z" fill={color}/>
    </svg>
    
    
    
  )
}
