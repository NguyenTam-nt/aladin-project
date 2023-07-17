import { Header } from '@components';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './HomeScreen';

const HomeStack = createStackNavigator();

export const Home = () => {
  return (
    <>
      <Header isCheckbox />
      <HomeStack.Navigator
        initialRouteName="homeScreen"
        screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="homeScreen" component={HomeScreen} />
      </HomeStack.Navigator>
    </>
  );
};
