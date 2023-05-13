import { ICArrowLeftLong } from '@assets/icons/ICArrowLeftLong'
import { Colors } from '@constants/color'
import React from 'react'
import YouTube from 'react-youtube';

export const HomeTopicVideo = () => {
  return (
    <div className='w-rp grid grid-cols-2 mb-[120px]'>
        <div className='relative h-[282px] home-topic-video-bg px-[32px] flex items-center'>
            <div className='absolute inset-0 z-[-1] '>
                <img className='w-full h-full object-cover' src='https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/29faa76315d5ebbe2c41509ef77d3293_70303_9.jpg' />
            </div>
            <div>
                    <p className='text-_24 font-semibold text-text_white'>Varius cras at risus nunc ut amet.</p>
                    <p className='text-_14 text-text_225_225_225_064 mt-[8px] mb-[24px]'>Nunc pretium cursus et orci nisl. </p>
                    <div>
                        <ICArrowLeftLong width={147} color={Colors.text_white} />
                    </div>
            </div>
        </div>
        <div className='h-[282px]'>
            <YouTube
                videoId='2tTlusUnZmE'
                className='w-full'
                opts={{
                    width: '100%',
                    height: "282px"
                }}        
            />
        </div>

    </div>
  )
}
