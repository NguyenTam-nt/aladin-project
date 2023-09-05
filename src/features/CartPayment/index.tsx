import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Cart} from './Cart';
import Payment from './Payment';

const CartPaymentRoute = createStackNavigator();

const CartPayment = () => {
  return (
    <CartPaymentRoute.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CartPaymentRoute.Screen name="cart" component={Cart} />
      <CartPaymentRoute.Screen name="payment" component={Payment} />
    </CartPaymentRoute.Navigator>
  );
};

export default CartPayment;
