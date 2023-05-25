
import { Colors } from '@constants/color'
import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICEditer = ({
  color = Colors.secondary,
  width = 40,
  height = 40,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M18.334 6.66797H6.66732C5.78326 6.66797 4.93542 7.01916 4.31029 7.64428C3.68517 8.2694 3.33398 9.11725 3.33398 10.0013V33.3346C3.33398 34.2187 3.68517 35.0665 4.31029 35.6917C4.93542 36.3168 5.78326 36.668 6.66732 36.668H30.0006C30.8847 36.668 31.7325 36.3168 32.3577 35.6917C32.9828 35.0665 33.334 34.2187 33.334 33.3346V21.668"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.834 4.16835C31.497 3.50531 32.3963 3.13281 33.334 3.13281C34.2717 3.13281 35.1709 3.50531 35.834 4.16835C36.497 4.83139 36.8695 5.73066 36.8695 6.66835C36.8695 7.60603 36.497 8.50531 35.834 9.16835L20.0007 25.0017L13.334 26.6683L15.0007 20.0017L30.834 4.16835Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>)
    }