
import React from 'react'
import { HeaderLogo } from './components/HeaderLogo'
import { HeaderNavigation } from './components/HeaderNavigation'
export const Header = () => {
  return (
    <div className='bg-white'>
      <div className=' border-b-[1px] border-solid border-br_E9ECEF'>
        <HeaderLogo />
      </div>
      <HeaderNavigation />
    </div>
  )
}
