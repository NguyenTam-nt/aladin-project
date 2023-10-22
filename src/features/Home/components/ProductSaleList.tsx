import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from 'src/commons/globalStyles';
import TextTilte from 'src/components/TextTitle';
import ProductItem from './ProductItem';
import { IProduct, getProductsApi } from 'src/api/products';
import ProductsList from 'src/components/product/ProductsList';
import { useListItemProvice } from 'src/redux/provices/hooks';

const ProductSaleList = () => {
  const proviceItem = useListItemProvice();
  const [productsSale, setProductsSale] = useState<IProduct[]>([]);
  const getProductsSale = async (provice: string) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: 'promo,desc',
        address: provice,
      };
      const res = await getProductsApi(params);
      setProductsSale(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getProductsSale(proviceItem.provices.Name)
  }, [proviceItem.provices])
  return (
    <View style={globalStyles.paddingScreenHorizontal}>
      <TextTilte text="home.product_sale" />
      <View style={styles.groupProduct}>
        {productsSale.length > 0 && (
          <ProductsList
            products={productsSale}
            textTile="home.product_sale"
          />
        )}
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
