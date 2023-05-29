import { TranslateContext } from '@contexts/Translation'
import React, { useContext } from 'react'

export const TextError = ({message}: {message: string}) => {
    const {t} = useContext(TranslateContext)
  return (
    <span className=' text-_12 text-text_C53434 absolute bottom-[-20px]'>{t(message)}</span>
  )
}
