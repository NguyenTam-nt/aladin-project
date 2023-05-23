import { TranslateContext } from '@contexts/Translation'
import React, { useContext } from 'react'

type Props = {
    title: string
}

export const TitleForm = ({title}:Props) => {
    const {t} = useContext(TranslateContext)
  return (
    <div className='flex justify-center'>
        <h2 className=' font-bold text-_32 text-text_primary text-center mb-[40px] uppercase'>{t(title)}</h2>
    </div>
  )
}
