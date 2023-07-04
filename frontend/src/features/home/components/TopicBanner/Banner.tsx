import React, { memo } from 'react'
import { BannerSliderImages } from './BannerSliderImages'

export const Banner = memo(() => {
  return (
    <div className='banner_home relative flex items-center'>
        <BannerSliderImages />
       
      
    </div>
  )
})
