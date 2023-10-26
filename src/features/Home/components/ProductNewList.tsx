import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from 'src/components/TextTitle';
import ProductItem from './ProductItem';
import {IProduct, getProductsApi} from 'src/api/products';
import {useListItemProvice} from 'src/redux/provices/hooks';
import ProductsList from 'src/components/product/ProductsList';
import {defaultColors} from '@configs';
import TextTranslate from 'src/components/TextTranslate';

const ProductNewList = () => {
  const SIZE = 10;
  const proviceItem = useListItemProvice();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCureentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false);
  const [oldProvice, setOldProvice] = useState<String>('');
  const getProducts = async (provice: string) => {
    try {
      setAction(true);
      const params = {
        page: currentPage,
        size: SIZE,
        sort: 'id,desc',
        address: provice,
      };
      const res = await getProductsApi(params);
      if (res) {
        if (oldProvice === provice) {
          setProducts([...products, ...res.data]);
          setTotalPages(res?.page?.max ?? 0);
        } else {
          setProducts(res.data);
          setTotalPages(res?.page?.max ?? 0);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAction(false);
    }
  };

  React.useEffect(() => {
    getProducts(proviceItem.provices.Name);
  }, [proviceItem.provices, currentPage]);

  React.useEffect(() => {
    setOldProvice(proviceItem.provices.Name);
  }, [proviceItem.provices]);
  return (
    <View style={styles.container}>
      {/* <TextTilte text="home.product_new" /> */}
      <View style={styles.groupProduct}>
        {products.length > 0 && (
          <ProductsList products={products} textTile="home.product_new" />
        )}
        {currentPage + 1 < totalPages && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              disabled={action}
              onPress={() => {
                setCureentPage(currentPage + 1);
                setAction(true);
              }}
              style={{
                width: 'auto',
                borderRadius: 30,
                borderColor: defaultColors.bg_00C3AB,
                borderWidth: 1,
                paddingHorizontal: 30,
                paddingVertical: 8,
              }}>
              <TextTranslate
                fontSize={18}
                weight="700"
                color={defaultColors.bg_00C3AB}
                text="common.see-more"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(ProductNewList);

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    // ...globalStyles.paddingScreenHorizontal,
  },
  groupProduct: {
    flexWrap: 'wrap',
    gap: 15,
    flexDirection: 'row',
    marginTop: 28,
  },
});
