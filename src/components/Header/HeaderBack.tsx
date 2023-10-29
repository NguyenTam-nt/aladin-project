import { PropsWithChildren } from 'react';
import { Header } from '.';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextTilte from '../TextTitle';
import React from 'react';
import { ICBack } from 'src/assets/icons/ICBack';
import { useGoBack } from 'src/hooks/useGoBack';
import { ICPrev } from 'src/assets/icons/ICPrev';
import { ICCart } from 'src/assets/icons/ICCart';
import { defaultColors } from '@configs';
import { useNavigation } from '@react-navigation/native';
import { productRoute } from 'src/constants/routers';
import { TextCustom } from '../Text';
import { useListItemCart } from 'src/redux/orderCart/hooks';
import TextTranslate from '../TextTranslate';

interface HeaderProps {
  headerBase?: boolean;
  textTile?: string;
  isProductDetail?: boolean;
  iconCart?: boolean;
  options?: { [key: string]: any }
}
const HeaderBack = (props: PropsWithChildren<HeaderProps>) => {
  const { textTile, isProductDetail = false, iconCart = false, options } = props;
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
            <View style={{ flex: 1 }}>
              <TextTilte text={textTile ?? ''} options={options} />
            </View>
          </>
        )}
        {isProductDetail && (
          <>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={dismiss}>
                <ICPrev />
              </TouchableOpacity>
              {iconCart === false && (
                <TextTranslate
                  fontSize={16}
                  weight="400"
                  color={defaultColors.c_0000}
                  text="cart.ttile"
                />
              )}
            </View>
            {iconCart && (
              <TouchableOpacity
                //@ts-ignore
                onPress={() => navigation.navigate(productRoute.cart)}
                style={styles.cart}>
                <ICCart color={defaultColors.primary} width={40} height={40} />
                <View style={styles.numberOfCart}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextCustom
                      textAlign="center"
                      fontSize={Platform.OS === 'ios' ? 14 : 12}
                      weight="400"
                      color={defaultColors.c_fff}>
                      {handleListCart.itemInCart.length ?? 0}
                    </TextCustom>
                  </View>
                </View>
              </TouchableOpacity>
            )}
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
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: defaultColors.primary,
    borderWidth: 2,
    borderColor: defaultColors.c_fff,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
