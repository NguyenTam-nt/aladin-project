import {PropsWithChildren} from 'react';
import {Header} from '.';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextTilte from '../TextTitle';
import React from 'react';
import {ICBack} from 'src/assets/icons/ICBack';
import {useGoBack} from 'src/hooks/useGoBack';
import {ICPrev} from 'src/assets/icons/ICPrev';
import {ICCart} from 'src/assets/icons/ICCart';
import {defaultColors} from '@configs';
import {useNavigation} from '@react-navigation/native';
import {productRoute} from 'src/constants/routers';
import {TextCustom} from '../Text';
import {useListItemCart} from 'src/redux/orderCart/hooks';

interface HeaderProps {
  headerBase?: boolean;
  textTile?: string;
  isProductDetail?: boolean;
}
const HeaderBack = (props: PropsWithChildren<HeaderProps>) => {
  const {textTile, isProductDetail = false} = props;
  const navigation = useNavigation();
  const dismiss = useGoBack();
  const handleListCart = useListItemCart();
  return (
    <Header>
      <View style={styles.container}>
        {textTile && (
          <>
            <TouchableOpacity onPress={dismiss}>
              <ICBack />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <TextTilte text={textTile ?? ''} />
            </View>
          </>
        )}
        {isProductDetail && (
          <>
            <TouchableOpacity onPress={dismiss}>
              <ICPrev />
            </TouchableOpacity>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate(productRoute.cart)}
              style={styles.cart}>
              <ICCart color={defaultColors.primary} />
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
          </>
        )}
      </View>
    </Header>
  );
};

export default HeaderBack;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 15,
  },
  cart: {
    // flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    backgroundColor: defaultColors.br_E9E9E9,
    borderRadius: 30,
  },
  numberOfCart: {
    position: 'absolute',
    top: 0,
    left: '50%',
    zIndex: 999,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: defaultColors.primary,
    borderWidth: 2,
    borderColor: defaultColors.c_fff,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
