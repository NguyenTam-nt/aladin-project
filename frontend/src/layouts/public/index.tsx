

import React from 'react'
import { Header } from './conponent/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './conponent/Footer'


export const PublicLayout = () => {
  return (
   <>
    <Header />
    <div className='min-h-[600px]'>
         <Outlet />
    </div>
    <Footer />
   </>
  )
}
