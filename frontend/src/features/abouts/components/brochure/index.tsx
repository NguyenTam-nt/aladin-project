import React from 'react'
import brochureImage from "@assets/images/brochure.jpg"

export const BrochurePage = () => {
  return (
    <div className='w-rp h-[238px] sm:h-[423px] lg:h-[523px] xl:h-[933px] overflow-hidden mt-[24px] xl:mt-[42px]'>
        <img alt='' src={brochureImage} />
    </div>
  )
}
