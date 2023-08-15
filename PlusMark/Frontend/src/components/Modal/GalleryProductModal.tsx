import { DeleteManageIcon } from '@assets/icons'
import { ModalContext } from '@contexts/contextModal'
import React, { MouseEventHandler, useContext, useState } from 'react'
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import './gallerymodal.css'

type Props = {
  video?: string,
  images: string[],
  srcInit: string
}

function GalleryProductModal({ video, images, srcInit }: Props) {
  const { closeModal } = useContext(ModalContext)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  
  return (
    <div className='p-3 bg-[#000000cc] pb-8 w-[100vw] h-[100vh]'>
      <div className="hover:cursor-pointer hover-text-main group" onClick={closeModal}>
        <DeleteManageIcon className="ml-auto mr-4 mt-2 group-hover:stroke-main" width={16} height={16} />
      </div>
      <div className="flex flex-col justify-between items-center h-full w-full py-8">
        <div className="w-full lg:w-[60%] flex-1 flex justify-center items-center">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-[50vh] xl:h-[60vh] 2xl:h-[70vh] "
          >
            {video && <SwiperSlide>
              <video  className=" w-full h-full object-contain" 
                autoPlay muted controls
                src={video} 
              />
            </SwiperSlide>}
            {images.map((item: any, idx:any) => {
              return <SwiperSlide key={idx}>
              <img src={item}  className='w-full h-full object-contain ' />
            </SwiperSlide>
            })}
          </Swiper>
        </div>
        <div className="h-36 w-full flex-shrink-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiperGallery w-full h-full"
          >
            {video && <SwiperSlide>
              <video  className=" aspect-square object-contain rounded-md cursor-pointer" autoPlay muted 
                  src={video} 
                />
              </SwiperSlide>}
              {images.map((item: any, idx:any) => {
                return <SwiperSlide key={idx}>
                <img src={item}  className='w-full h-full object-contain ' />
              </SwiperSlide>
              })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default GalleryProductModal