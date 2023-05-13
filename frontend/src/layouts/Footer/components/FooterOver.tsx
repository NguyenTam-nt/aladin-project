import { langs } from '@constants/footer'
import { TranslateContext } from '@contexts/Translation'
import React, { useContext } from 'react'
import { ButtonFooterChangeLang } from './ButtonFooterChangeLang'

export const FooterOver = () => {
    const {t} = useContext(TranslateContext)
  return (
    <div className='py-[27px] xl:py-[50px]  bg-secondary  text-[14px]'>
        <div className='w-rp flex flex-col-reverse m992:flex-row justify-between items-center'>
            
            <span className='text-text_white text-center m992:text-left mt-[24px] m992:mt-0'>{t("home.footer.access_count")}: 35</span>
            <span className='text-text_white text-center m992:text-left mt-[24px] m992:mt-0'>Non Copyrighted © 2022 Design and upload by rich technologies</span>
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
