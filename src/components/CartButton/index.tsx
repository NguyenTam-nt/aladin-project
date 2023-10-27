import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ICCart} from 'src/assets/icons/ICCart';
import {TextCustom} from '../Text';
import {defaultColors} from '@configs';
import {useListItemCart} from 'src/redux/orderCart/hooks';
import {useNavigation} from '@react-navigation/native';
import {productRoute} from 'src/constants/routers';
import {boolean} from 'yup';

const CartButton = (props: {isProductSreecn?: false}) => {
  const {isProductSreecn} = props;
  const handleListCart = useListItemCart();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      // onPress={() => navigation.navigate('mains', {screen: 'product', params:{ screen: productRoute.cart}})}
      onPress={() => navigation.navigate(`${productRoute.cart}`)}
      style={styles().container}>
      <ICCart
        width={40}
        height={40}
        color={isProductSreecn ? defaultColors.primary : defaultColors.c_fff}
      />
      <View style={styles(isProductSreecn).numberOfCart}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextCustom
            textAlign="center"
            fontSize={Platform.OS === 'ios' ? 14 : 10}
            weight="400"
            color={defaultColors.c_fff}>
            {handleListCart.itemInCart.length ?? 0}
          </TextCustom>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = (isProduct?: boolean) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    numberOfCart: {
      position: 'absolute',
      top: 0,
      left: '50%',
      zIndex: 999,
      width: 25,
      height: 25,
      borderRadius: 30,
      backgroundColor: isProduct
        ? defaultColors.primary
        : defaultColors.text_EE0000,
      borderWidth: 2,
      borderColor: defaultColors.c_fff,
    },
  });
