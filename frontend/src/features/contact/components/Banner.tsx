import { ICArowRight } from '@assets/icons'
import { Button } from '@components/Button'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import banner from "@assets/images/promotion/bannerTop.png";

export const Banner = memo(({name, path}: any) => {
  const {t} = useTranslation()

  return (
    <div className="relative h-[270px] lg:h-[488px] ">
      <img className="absolute object-cover w-full h-full" src={banner} alt="logo" />
      <div className="relative w-rp h-full">
        <div className="hidden lg:block absolute bottom-[28%] left-0 z-20">
          <h2 className="title-32 font-normal mb-4 text-white">{name}</h2>
          <div className=''>
            <Link className="text-white text-base text-center" to={"/"}>
              Trang chủ
            </Link>
            <span className="mx-2 text-white">/</span>
            <Link className="text-white text-base text-center" to={path}>
              {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
})
