import { TranslateContext } from '@contexts/Translation'
import React, { useContext } from 'react'

type Props = {
    forId: string
    isRequired?: boolean
    name: string
}

const TitleInput = ({forId, isRequired = true, name}:Props) => {
    const {t} = useContext(TranslateContext)
  return (
    <div className='flex items-center text-_14 font-semibold text-text_primary mb-2'>
        <label htmlFor={forId}>{t(name)}</label>
        {
            isRequired ?  <span className='text-text_C53434 ml-1'>*</span> : null
        }
       
    </div>
  )
}

export default TitleInput