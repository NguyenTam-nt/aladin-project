

import React from 'react'
import { Header } from './conponent/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './conponent/Footer'

import bgContact from "@assets/images/contact/bg-contact.jpg";

export const PublicLayout = () => {
  return (
   <>
    <Header />
    <div className='min-h-[1200px]'
      style={{
        backgroundImage: `url(${bgContact})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
         <Outlet />
    </div>
    <Footer />
   </>
  )
}
