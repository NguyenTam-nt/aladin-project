import type { IIcon } from '@typeRules/icon'
import React from 'react'

export const ICLogout = ({color = "#C53434", width = 22, height = 20}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C13.2713 0 16.1757 1.57078 18.0002 3.99923L15.2909 3.99931C13.8807 2.75499 12.0285 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C12.029 18 13.8816 17.2446 15.2919 15.9998H18.0009C16.1765 18.4288 13.2717 20 10 20ZM17 14V11H9V9H17V6L22 10L17 14Z" fill={color} />
    </svg>
    
  )
}
