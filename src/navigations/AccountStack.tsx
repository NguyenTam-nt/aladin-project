import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {accountRoute} from 'src/constants/routers';
import AccountScreen from 'src/features/Account';
import ChangePassword from 'src/features/Account/ChangePassword';
import ManageAccountInfo from 'src/features/Account/ManageAccountInfo';

const AccountStack = createStackNavigator();

export const AccountStackScreen = () => (
  <AccountStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={accountRoute.prifex}>
    <AccountStack.Screen name={accountRoute.prifex} component={AccountScreen} />
    <AccountStack.Screen
      name={accountRoute.manageAccountInfo}
      component={ManageAccountInfo}
    />
    <AccountStack.Screen
      name={accountRoute.changePass}
      component={ChangePassword}
    />
  </AccountStack.Navigator>
);
