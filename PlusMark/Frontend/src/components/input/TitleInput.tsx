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
    <div className='flex items-center text-normal1 font-bold font-NunitoSans leading-[22px] text-black-bl0 mb-2'>
        <label htmlFor={forId}>{t(name)}</label>
        {
            isRequired ?  <span className='text-red-r03 ml-1'>*</span> : null
        }
       
    </div>
  )
}

export default TitleInput
