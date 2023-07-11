import React, { useMemo } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigation} from './Drawer';

export const RootStack = createStackNavigator();
export const MainStack = () => {
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      headerStyle: {
        shadowColor: 'transparent',
      },
    }),
    [],
  );
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={screenOptions}>
        <RootStack.Screen name="main" component={DrawerNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
