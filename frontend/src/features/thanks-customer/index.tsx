import { Banner } from '@components/Banner'
import React from 'react'
import { Body } from './components/Body'
import { HomeTopicType } from '@typeRules/home'

export const ThanksCustomer = () => {
  return (
    <>
        <Banner type={HomeTopicType.menu}  />
        <Body />
    </>
  )
}
