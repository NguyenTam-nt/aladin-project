import React from 'react'
import { Colors } from '@constants/color'
import type { IIcon } from '@typeRules/icon'

export const ICLibraryImage = ({color = Colors.text_secondary, width = 21, height = 18}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.2703 9.2162L13 3L21 18H0L7 5L9.2703 9.2162ZM10.3897 11.2378L12.9873 16H17.6667L12.8976 7.058L10.3897 11.2378ZM3.34843 16H10.6516L7 9.2185L3.34843 16ZM3.5 5C2.11929 5 1 3.88071 1 2.5C1 1.11929 2.11929 0 3.5 0C4.88071 0 6 1.11929 6 2.5C6 3.88071 4.88071 5 3.5 5Z" fill={color}/>
    </svg>
  )
}
