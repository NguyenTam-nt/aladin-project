import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from 'src/components/TextTitle';
import ProductItem from './ProductItem';

const ProductNewList = () => {
  return (
    <View style={styles.container}>
      <TextTilte text="home.product_new" />
      <View style={styles.groupProduct}>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </View>
    </View>
  );
  }

export default memo(ProductNewList)

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    ...globalStyles.paddingScreenHorizontal,
  },
  groupProduct: {
    flexWrap: 'wrap',
    gap: 15,
    flexDirection: 'row',
    marginTop: 28,
  },
});
