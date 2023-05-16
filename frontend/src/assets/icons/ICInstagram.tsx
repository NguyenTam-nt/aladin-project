import React from 'react'
import type { IIcon } from 'typeRules/icon'
import { Colors } from '@constants/color'

export const ICInstagram = ({color = Colors.secondary, width = 20, height = 20}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 10C13 10.5933 12.8241 11.1734 12.4944 11.6667C12.1648 12.1601 11.6962 12.5446 11.1481 12.7716C10.5999 12.9987 9.99667 13.0581 9.41473 12.9424C8.83279 12.8266 8.29824 12.5409 7.87868 12.1213C7.45912 11.7018 7.1734 11.1672 7.05764 10.5853C6.94189 10.0033 7.0013 9.40013 7.22836 8.85195C7.45542 8.30377 7.83994 7.83524 8.33329 7.50559C8.82664 7.17595 9.40666 7 10 7C10.7949 7.00247 11.5565 7.31934 12.1186 7.88141C12.6807 8.44349 12.9975 9.20511 13 10ZM19.375 5.875V14.125C19.375 15.5174 18.8219 16.8527 17.8373 17.8373C16.8527 18.8219 15.5174 19.375 14.125 19.375H5.875C4.48261 19.375 3.14726 18.8219 2.16269 17.8373C1.17812 16.8527 0.625 15.5174 0.625 14.125V5.875C0.625 4.48261 1.17812 3.14726 2.16269 2.16269C3.14726 1.17812 4.48261 0.625 5.875 0.625H14.125C15.5174 0.625 16.8527 1.17812 17.8373 2.16269C18.8219 3.14726 19.375 4.48261 19.375 5.875ZM14.5 10C14.5 9.10998 14.2361 8.23995 13.7416 7.49993C13.2471 6.75991 12.5443 6.18314 11.7221 5.84254C10.8998 5.50195 9.99501 5.41283 9.12209 5.58647C8.24918 5.7601 7.44736 6.18868 6.81802 6.81802C6.18868 7.44736 5.7601 8.24918 5.58647 9.12209C5.41283 9.99501 5.50195 10.8998 5.84254 11.7221C6.18314 12.5443 6.75991 13.2471 7.49993 13.7416C8.23995 14.2361 9.10998 14.5 10 14.5C11.1935 14.5 12.3381 14.0259 13.182 13.182C14.0259 12.3381 14.5 11.1935 14.5 10ZM16 5.125C16 4.9025 15.934 4.68499 15.8104 4.49998C15.6868 4.31498 15.5111 4.17078 15.3055 4.08564C15.1 4.00049 14.8738 3.97821 14.6555 4.02162C14.4373 4.06502 14.2368 4.17217 14.0795 4.3295C13.9222 4.48684 13.815 4.68729 13.7716 4.90552C13.7282 5.12375 13.7505 5.34995 13.8356 5.55552C13.9208 5.76109 14.065 5.93679 14.25 6.0604C14.435 6.18402 14.6525 6.25 14.875 6.25C15.1734 6.25 15.4595 6.13147 15.6705 5.9205C15.8815 5.70952 16 5.42337 16 5.125Z" fill={color}/>
    </svg>
    
    
    
  )
}
