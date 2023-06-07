import React from 'react'
import { Banner } from './components/Banner'
import { HomeTopicDevice } from './components/HomeTopicDevice'

export const HomePage = () => {
  return (
   <>
    <Banner />
    <div className='home-body'>
         <HomeTopicDevice />

    </div>
   </>
  )
}
