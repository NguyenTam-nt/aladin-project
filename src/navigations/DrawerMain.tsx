import { defaultColors } from '@configs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import SockJS from 'sockjs-client';
import DrawerNavigation from './Drawer';
import DrawerKitchen from './DrawerKitchen';
import DrawerOrderNavigation from './DrawerOrder';
import { sockClient } from 'src/api/config';
var Stomp = require('stompjs/lib/stomp.js').Stomp;

export const RootStack = createStackNavigator();
export const DrawerMain = () => {

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
    <>
      <StatusBar
        backgroundColor={defaultColors.bg_header}
        barStyle={'light-content'}
      />
        <RootStack.Navigator
          initialRouteName="mainDrawer"
          screenOptions={screenOptions}>
          <RootStack.Screen name="mainDrawer" component={DrawerNavigation} />
          <RootStack.Screen name="orderTab" component={DrawerOrderNavigation} />
          <RootStack.Screen name="kitchen" component={DrawerKitchen} />
        </RootStack.Navigator>
    </>
  );
};
