import React, { memo } from 'react'
import { BannerSliderImages } from './BannerSliderImages'
import { BannerText } from './BannerText'

export const Banner = memo(() => {
  return (
    <div className='banner_home relative flex items-center'>
        <div className='absolute inset-0 bg-banner_home z-[2]' />
        <BannerSliderImages />
        <BannerText />
    </div>
  )
})
