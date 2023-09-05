import {StyleSheet, View} from 'react-native';
import React from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from 'src/components/TextTitle';
import ProductItem from './ProductItem';

const ProductSaleList = () => {
  return (
    <View style={globalStyles.paddingScreenHorizontal}>
      <TextTilte text="home.product_sale" />
      <View style={styles.groupProduct}>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </View>
    </View>
  );
};

export default ProductSaleList;

const styles = StyleSheet.create({
  groupProduct: {
    flexWrap: 'wrap',
    gap: 15,
    flexDirection: 'row',
    marginTop: 28,
  },
});
