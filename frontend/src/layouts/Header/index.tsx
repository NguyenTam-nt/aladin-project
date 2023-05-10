
import React from 'react'
import { HeaderCommon } from './components/HeaderCommon'
import { HeaderLogo } from './components/HeaderLogo'
export const Header = () => {
  return (
    <div className='bg-white'>
      <HeaderCommon />
      <div className=' border-b-[1px] border-solid border-br_E9ECEF'>
        <HeaderLogo />
      </div>
    </div>
  )
}
