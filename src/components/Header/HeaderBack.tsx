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

interface HeaderProps {
  headerBase?: boolean;
  textTile?: string;
  isProductDetail?: boolean;
}
const HeaderBack = (props: PropsWithChildren<HeaderProps>) => {
  const {textTile, isProductDetail = false} = props;
  const dismiss = useGoBack();
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
            <View style={styles.cart}>
              <ICCart color={defaultColors.primary}/>
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    backgroundColor: defaultColors.br_E9E9E9,
    borderRadius: 30,
  },
});
