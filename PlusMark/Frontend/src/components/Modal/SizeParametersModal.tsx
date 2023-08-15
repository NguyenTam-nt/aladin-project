import { LogoSupershopIcon, RadioSuccessIcon } from '@assets/icons'
import useI18n from '@hooks/useI18n'
import { some } from '@utility/helper'
import React from 'react'

function SizeParametersModal({imageUrl}: some) {

  const {t} = useI18n()

  return (
    <div className='flex flex-col justify-center items-center bg-white rounded-md lg:rounded-lg shadow-md p-2 lg:p-7 mx-4 h-fit max-h-3/4'>
        <img src={imageUrl || "/images-raw/size.png"} className="h-full w-auto object-contain" alt='size parameters' />
    </div>
  )
}

export default SizeParametersModal