import { langs } from '@constants/footer'
import React from 'react'
import { ButtonFooterChangeLang } from './ButtonFooterChangeLang'

export const FooterOver = () => {
  return (
    <div className='py-[50px] bg-primary  text-[14px]'>
        <div className='w-rp flex justify-between items-center'>
            <span className='text-text_white'>Non Copyrighted © 2022 Design and upload by rich technologies</span>
            <div className='flex'>
                {
                    langs.map((item) => {
                        return <ButtonFooterChangeLang key={item.id} type={item.id} text={item.text} />
                    })
                }
            </div>
        </div>
    </div>
  )
}
