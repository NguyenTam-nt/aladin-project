import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Header} from '@components';
import { View } from 'react-native';
import SnackScreen from './SnackScreen';

const SnackStack = createStackNavigator();

export const SnackOrder = () => {
  return (
    <>
      <Header  goBack/>
      <SnackStack.Navigator
        initialRouteName="snackSreen"
        screenOptions={{headerShown: false}}>
        <SnackStack.Screen name="snackSreen" component={SnackScreen} />
      </SnackStack.Navigator>
    </>
  );
};
