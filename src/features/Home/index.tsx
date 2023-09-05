import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartPayment from '../CartPayment';
import HomeScren from './HomeScren';
const CartPaymentRoute = createStackNavigator();

export const Home = () => {
  return (
    <CartPaymentRoute.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="homescreen">
      <CartPaymentRoute.Screen name="homescreen" component={HomeScren} />
      <CartPaymentRoute.Screen name="cartpayment" component={CartPayment} />
    </CartPaymentRoute.Navigator>
  );
};

const styles = StyleSheet.create({});
