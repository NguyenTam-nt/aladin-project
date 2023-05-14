import { HeaderTilteLink } from '@components/HeaderTilteLink'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Banner } from './components/Banner'

const AboutPage = () => {
  return (
    <div className='mb-[40px] xl:mb-[120px]'>
        <Banner />
        <HeaderTilteLink />
        <Outlet />
    </div>
  )
}

export default AboutPage
