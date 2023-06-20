import { Banner } from '@components/Banner'
import React from 'react'
import { MenuDetailBody } from './components/MenuDetailBody'
import { HomeTopicType } from '@typeRules/home'

export const MenuDetail = () => {
  return (
    <>
        <Banner type={HomeTopicType.menu} />
        <MenuDetailBody />
    </>
  )
}
