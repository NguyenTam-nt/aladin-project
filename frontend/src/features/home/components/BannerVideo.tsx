import React, { useEffect, useRef } from 'react'
import useInView from '@hooks/useInView'
import { useGetBanner } from '@features/abouts/components/useGetBanner'
import { BannerType } from '@typeRules/banner'

export const BannerVideo = () => {
    const {ref, isInView} = useInView(true)
    const refVideo = useRef<HTMLVideoElement>(null)
    const {banner} = useGetBanner(BannerType.home)
    useEffect(() => {
        if(refVideo.current &&  banner?.link) {
            if(isInView) {
                refVideo.current.play()
            }else {
                refVideo.current.pause()
            }

        }
    }, [isInView,  banner?.link])
  return (
    <div ref={ref} className='banner_home_video'>
    {   banner?.link ? <video loop muted ref={refVideo} className='w-full h-full object-cover'>
            <source src={banner?.link} type="video/mp4" />
        </video> : null}
    </div> 
  )
}
