import React from 'react'
import banner from "@assets/images/promotion/bannerTop.png";
export const Banner = () => {
  return (
    <div className='h-[488px] w-full relative'>
        <img alt='' className=' absolute inset-0 h-full w-full object-cover' src={banner} />
    </div>
  )
}
