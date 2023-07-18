import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import DrawerNavigation from './Drawer';
import {defaultColors} from '@configs';
import DrawerOrderNavigation from './DrawerOrder';
import DrawerKitchen from './DrawerKitchen';

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
