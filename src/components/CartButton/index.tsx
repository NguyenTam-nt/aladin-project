import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ICCart} from 'src/assets/icons/ICCart';
import {TextCustom} from '../Text';
import {defaultColors} from '@configs';
import {useListItemCart} from 'src/redux/orderCart/hooks';
import {useNavigation} from '@react-navigation/native';
import {productRoute} from 'src/constants/routers';

const CartButton = () => {
  const handleListCart = useListItemCart();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      // onPress={() => navigation.navigate('mains', {screen: 'product', params:{ screen: productRoute.cart}})}
      onPress={() => navigation.navigate(`${productRoute.cart}`)}
      style={styles.container}>
      <ICCart width={30} height={35} />
      <View style={styles.numberOfCart}>
        <TextCustom
          textAlign="center"
          fontSize={14}
          weight="400"
          color={defaultColors.c_fff}>
          {handleListCart.itemInCart.length ?? 0}
        </TextCustom>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  numberOfCart: {
    position: 'absolute',
    top: 0,
    left: '50%',
    zIndex: 999,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: defaultColors.text_EE0000,
    borderWidth: 2,
    borderColor: defaultColors.c_fff,
  },
});
