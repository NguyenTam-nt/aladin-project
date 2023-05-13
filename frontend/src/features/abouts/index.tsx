import React from 'react'
import { Outlet } from 'react-router-dom'
import { Banner } from './components/Banner'

const AboutPage = () => {
  return (
    <>
        <Banner />
        <Outlet />
    </>
  )
}

export default AboutPage
