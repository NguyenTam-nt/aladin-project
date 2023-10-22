import { StyleSheet, View } from 'react-native';
import React, { memo, useState } from 'react';
import { globalStyles } from 'src/commons/globalStyles';
import TextTilte from 'src/components/TextTitle';
import ProductItem from './ProductItem';
import { IProduct, getProductsApi } from 'src/api/products';
import { useListItemProvice } from 'src/redux/provices/hooks';
import ProductsList from 'src/components/product/ProductsList';

const ProductNewList = () => {
  const proviceItem = useListItemProvice();
  const [products, setProducts] = useState<IProduct[]>([]);
  const getProducts = async (provice: string) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: 'id,desc',
        address: provice,
      };
      const res = await getProductsApi(params);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getProducts(proviceItem.provices.Name)
  }, [proviceItem.provices])

  return (
    <View style={styles.container}>
      <TextTilte text="home.product_new" />
      <View style={styles.groupProduct}>
        {products.length > 0 && (
          <ProductsList
            products={products}
            textTile="home.product_sale"
          />
        )}
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
