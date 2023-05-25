import { HeaderAdmin } from '@features/dashboard/components/HeaderAdmin'
import React from 'react'
import { TopicHistory } from './components/TopicHistory'
import { TopicPost } from './components/TopicPost'

export const General = () => {
  return (
    <>
        <HeaderAdmin
            title='admin._about._general._title'
        />
      <TopicHistory />
      <TopicPost />
    </>
  )
}
