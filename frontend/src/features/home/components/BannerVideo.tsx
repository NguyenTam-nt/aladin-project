import React, { useEffect, useRef } from 'react'
import VideoHome from "@assets/videos/video_home_banner.mp4"
import useInView from '@hooks/useInView'

export const BannerVideo = () => {
    const {ref, isInView} = useInView(true)
    const refVideo = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        if(refVideo.current) {
            if(isInView) {
                refVideo.current.play().then(() => {
                    // refVideo.current!.muted = false
                })
            }else {
                refVideo.current.pause()
            }

        }
    }, [isInView])
  return (
    <div ref={ref} className='banner_home_video'>
        <video autoPlay playsInline loop muted ref={refVideo} className='w-full h-full object-cover'>
            <source src={VideoHome} type="video/mp4" />
        </video>
    </div> 
  )
}
