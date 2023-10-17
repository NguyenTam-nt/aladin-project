import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {accountRoute} from 'src/constants/routers';
import AccountScreen from 'src/features/Account';

const AccountStack = createStackNavigator();

export const AccountStackScreen = () => (
  <AccountStack.Navigator screenOptions={{headerShown: false}}>
    <AccountStack.Screen name={accountRoute.prifex} component={AccountScreen} />
  </AccountStack.Navigator>
);
