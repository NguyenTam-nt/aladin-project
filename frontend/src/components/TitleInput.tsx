import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
    forId?: string
    isRequired?: boolean
    name: string
}

const TitleInput = ({forId, isRequired = true, name}:Props) => {
  const {t} = useTranslation()
  return (
    <div className='flex items-center text-_12 lg:text-_14 font-semibold text-text_black mb-2'>
        <label htmlFor={forId}>{t(name)}</label>
        {
            isRequired ?  <span className='text-text_red ml-1'>*</span> : null
        }
       
    </div>
  )
}

export default TitleInput