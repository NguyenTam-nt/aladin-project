import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Header} from '@components';
import HotPotScreen from './HotPotScreen';

const FloorStack = createStackNavigator();
export const HotpotOrder = () => {
  return (
    <>
      <Header  goBack/>
      <FloorStack.Navigator
        initialRouteName="hotpotScreen"
        screenOptions={{headerShown: false}}>
        <FloorStack.Screen name="hotpotScreen" component={HotPotScreen} />
      </FloorStack.Navigator>
    </>
  );
};

