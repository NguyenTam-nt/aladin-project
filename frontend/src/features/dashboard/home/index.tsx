import React from 'react'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { TopicVideo } from './components/TopicVideo'
import { TopicBanner } from './components/TopicBanner'
import { TopicEvent } from './components/TopicEvent'
import { TopicEventDe } from './components/TopicEventDe'
import { TopicParter } from './components/TopicParter'

export const Home = () => {
    
  return (
    <>
        <HeaderAdmin title='admin._home._title' />
        <TopicVideo />
        <TopicBanner />
        <TopicEvent />
        <TopicEventDe />
        <TopicParter />
    </>
  )
}
