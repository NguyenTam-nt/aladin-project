import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const ProductDetailItem = () => {
  return (
    <View style={styles.conteiner}>
      <TextCustom fontSize={18} weight="700" color={defaultColors.text_313131}>
        Noi com dien
      </TextCustom>
    </View>
  );
};
export default ProductDetailItem;
const styles = StyleSheet.create({
  conteiner: {
    // position: 'relative',
    // paddingHpaddingp: 15,
  },
});
