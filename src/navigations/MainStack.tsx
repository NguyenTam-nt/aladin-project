import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './BottomTab'

const MainStack = () => {
  return (
    <NavigationContainer>
        <BottomTab />
    </NavigationContainer>
  )
}

export default MainStack