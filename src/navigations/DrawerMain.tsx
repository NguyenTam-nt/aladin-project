import { defaultColors } from '@configs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import SockJS from 'sockjs-client';
import DrawerNavigation from './Drawer';
import DrawerKitchen from './DrawerKitchen';
import DrawerOrderNavigation from './DrawerOrder';
import { useToken } from 'src/redux/reducers/hook';
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

  const token = useToken();

  // useEffect(() => {
  //   if (token) {
  //     var sock = new SockJS(
  //       'http://192.168.2.2:8080/websocket/tracker?access_token=' + token,
  //     );
  //     let stompClient = Stomp.over(sock);
  //     sock.onopen = function () {};
  //     stompClient.connect(function (frame: any) {
  //       stompClient.subscribe('/topic/hello', async function (greeting: any) {
  //         let newData = await JSON.parse(greeting.body);
  //         console.log('newData', newData, greeting);
  //       });
  //     });
  //   }
  // }, [token]);

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
