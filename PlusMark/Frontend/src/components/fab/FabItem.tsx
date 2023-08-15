import { FacebookIcon, PhoneSupportIcon, ZaloIcon, ZaloSupportIcon } from '@assets/icons'
import { SupportOnlineInfo } from '@services/SupportOnlineServices'
import { SUPPORT_ONLINE } from '@utility/constants'
import clsx from 'clsx'
import React, { useEffect } from 'react'

type Props = {
  data: SupportOnlineInfo
}

function FabItem({data}: Props) {

  return (
      data.appName != SUPPORT_ONLINE.FACEBOOK ?
        <div className={clsx("h-11 w-11 fab-buttons_item relative group flex justify-center items-center bg-white cursor-pointer", {
          // "bg-white": data.appName == SUPPORT_ONLINE.PHONE ||  data.appName == SUPPORT_ONLINE.FACEBOOK,
          // "bg-[#2f82fc]": data.appName == SUPPORT_ONLINE.ZALO,
        })}>
          <div className="w-6 h-6 ">
            {
              data.appName == SUPPORT_ONLINE.PHONE ? <PhoneSupportIcon className='w-full h-full fill-main-2'/> :
                <ZaloSupportIcon className='w-full h-full fill-main-2' />
            }
          </div>
          <div className='group-hover:block hidden absolute right-full top-1/2 -translate-y-1/2 mr-2 text-text text-wap-regular2 font-bold py-4 '>
            <div className="absolute w-5 h-full left-full top-0 "></div>
            <a target={`${data.appName == SUPPORT_ONLINE.PHONE ? "" : "blank"}`} href={`${data.appName == SUPPORT_ONLINE.PHONE ? 'tel:' : 'https://zalo.me/'}${data.script}`} className={clsx("shadow-md block mt-[24px] rounded-[20px] w-[250px] lg:w-[300px]   px-[25px] py-[15px] bg-main")}>
              <div className="flex items-center">
                <div className="contact-avatar">
                  <img src='/images-raw/contact_avatar.png' alt='' className='rounded-[100rem]' />
                </div>
                <div className="flex flex-col  justify-between text-white ml-[21px]">
                  <p className="text-wap-regular2 lg:text-normal1 font-medium lg:font-semibold text-left">{data.fullname}</p>
                  <span  className="text-wap-regular2 lg:text-normal font-light break-words">{data.script}</span>
                </div>
              </div>
            </a> 
          </div>
        </div>
      : <> </>
  )
}

export default FabItem