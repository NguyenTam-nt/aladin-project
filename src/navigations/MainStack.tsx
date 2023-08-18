import {defaultColors} from '@configs';
import {NavigationContainer, NavigationProp, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {StatusBar} from 'react-native';
import LoginScreen from 'src/features/login';
import {DrawerMain} from './DrawerMain';
import {useUserInfo} from 'src/redux/reducers/hook';


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
  const userInfo = useUserInfo();

  return (
    <>
      <StatusBar
        backgroundColor={defaultColors.bg_header}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={userInfo.id ? 'main' : 'login'}
          screenOptions={screenOptions}>
          <RootStack.Screen name="main" component={DrawerMain} />
          <RootStack.Screen name="login" component={LoginScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};
