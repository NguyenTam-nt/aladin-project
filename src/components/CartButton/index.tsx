import {Pressable} from 'react-native';
import React from 'react';
import {ICCart} from 'src/assets/icons/ICCart';

const CartButton = () => {
  return (
    <Pressable>
      <ICCart />
    </Pressable>
  );
};

export default CartButton;
