import { ROLE_LIST, defaultColors, isTabletDevice } from '@configs';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { IAuthorize } from 'src/redux/reducers/AuthSlice';
import { useUserInfo } from 'src/redux/reducers/hook';
import DrawerNavigation from './Drawer';
import DrawerKitchen from './DrawerKitchen';
import DrawerOrderNavigation from './DrawerOrder';
import { useNavigation } from '@react-navigation/native';

export const RefNavigationToLoginScreen : any = React.createRef();
export const RootStack = createStackNavigator();
export const DrawerMain = () => {
  if (!RefNavigationToLoginScreen.current) {
    RefNavigationToLoginScreen.current = {};}
    const navigation = useNavigation();
  const screenOptions = useMemo<DrawerNavigationOptions>(
    () => ({
      drawerType: isTabletDevice ? 'permanent' : 'slide',
      headerShown: false,
      headerStyle: {
        shadowColor: 'transparent',
      },
    }),
    [],
  );
  const userInfo = useUserInfo();
  const checkIsKitchen = userInfo?.authorities?.some((role: IAuthorize) => {
    switch (role.name) {
      case ROLE_LIST.chef:
        // navigation.replace('main', {screen: 'kitchen', params: {
        //         screen: 'wait-progressing'
        //       }});
        return true;
      default:
        return false;
    }
  });
  const GotoLoginScreen = () => {
    navigation.replace('login');
  };

  RefNavigationToLoginScreen.current.GotoLoginScreen = GotoLoginScreen;

  return (
    <>
      <StatusBar
        backgroundColor={defaultColors.bg_header}
        barStyle={'light-content'}
      />
      <RootStack.Navigator
        initialRouteName={checkIsKitchen ? 'kitchen' : 'mainDrawer'}
        screenOptions={screenOptions}>
        <RootStack.Screen name="mainDrawer" component={DrawerNavigation} />
        <RootStack.Screen name="orderTab" component={DrawerOrderNavigation} />
        <RootStack.Screen name="kitchen" component={DrawerKitchen} />
      </RootStack.Navigator>
    </>
  );
};