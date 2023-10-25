import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from './AboutScreen';
import { productRoute } from 'src/constants/routers';
import ProductDetail from '../Products/ProductDetail';

const AbountStack = createStackNavigator();

export const About = () => {
  return (
    <AbountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="about">
      <AbountStack.Screen name="about" component={AboutScreen} />
      <AbountStack.Screen
        name={productRoute.detail}
        component={ProductDetail}
      />
    </AbountStack.Navigator>
  );
};