import React from 'react'
import { useGetBanner } from '../useGetBanner'
import { BannerType } from '@typeRules/banner'

export const BrochurePage = () => {
  const {banner} = useGetBanner(BannerType.aboutBrochure)
  return (
    <div className='w-rp h-[238px] sm:h-[423px] lg:h-[523px] xl:h-[933px] overflow-hidden mt-[24px] xl:mt-[42px]'>
        <img alt='' src={banner?.link} />
    </div>
  )
}
