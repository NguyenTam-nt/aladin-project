import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartPayment from '../CartPayment';
import HomeScren from './HomeScren';
import {productRoute} from 'src/constants/routers';
import ProductDetail from '../Products/ProductDetail';
import CategoriesScreen from '../Categories';
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
      <CartPaymentRoute.Screen
        name={productRoute.detail}
        component={ProductDetail}
      />
      <CartPaymentRoute.Screen
        name={productRoute.categories.detail}
        component={CategoriesScreen}
      />
    </CartPaymentRoute.Navigator>
  );
};

const styles = StyleSheet.create({});
