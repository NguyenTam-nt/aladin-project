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
    <div className='flex items-center text-wap-regular leading-[22px] font-semibold text-black00 mb-2'>
        <label htmlFor={forId}>{t(name)}</label>
        {
            isRequired ?  <span className='text-red01 ml-1'>*</span> : null
        }
       
    </div>
  )
}

export default TitleInput
