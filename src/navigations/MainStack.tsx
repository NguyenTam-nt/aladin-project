import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import DrawerNavigation from './Drawer';
import {defaultColors} from '@configs';
import DrawerOrderNavigation from './DrawerOrder';
import DrawerKitchen from './DrawerKitchen';
var Stomp = require('stompjs/lib/stomp.js').Stomp;
import SockJS from 'sockjs-client';

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

  const [isSuccess , setIsSuccess] = useState<boolean>(true);
  // useEffect(() => {
  //   var socket = new SockJS('http://192.168.2.2:8081/ws');
  //   var headers = {
  //     login: 'mylogin',
  //     passcode: 'mypasscode',
  //     // additional header
  //     'client-id': 'my-client-id',
  // };
  //   const stompClient = Stomp.over(socket);
  //   stompClient.connect(
  //     headers,
  //     () => {
  //       setIsSuccess(true);
  //       console.log('stomp client connected');

  //     },
  //     () => console.log('error'),
  //   );
  // }, []);

  useEffect(() => {
    if (isSuccess) {
      // var sock = new SockJS('http://192.168.2.2:8080/websocket/tracker'  );
      var sock = new SockJS('http://192.168.2.2:8080/websocket/tracker');

      let stompClient = Stomp.over(sock);
      stompClient.connect(
        () => {
          setIsSuccess(true);
          console.log('stomp client connected');

        },
        () => console.log('error'),
      );
      // sock.onopen = function () {};

      // stompClient.connect( function (frame: any) {
      //   stompClient.subscribe('/topic/hello', async function (greeting: any) {
      //     let newData = await JSON.parse(greeting.body);
      //     console.log('newData', newData, greeting);
      //   });
      // });
    }
  }, [isSuccess]);

  return (
    <>
      <StatusBar
        backgroundColor={defaultColors.bg_header}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="kitchen"
          screenOptions={screenOptions}>
          <RootStack.Screen name="main" component={DrawerNavigation} />
          <RootStack.Screen name="orderTab" component={DrawerOrderNavigation} />
          <RootStack.Screen name="kitchen" component={DrawerKitchen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};
