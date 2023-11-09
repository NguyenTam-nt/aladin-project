import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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
  const getProducts = async (provice: string, page: number, loop?: boolean) => {
    try {
      setAction(true);
      const params = {
        page: page,
        size: SIZE,
        sort: 'id,desc',
        address: provice,
      };
      const res = await getProductsApi(params);
      if (res) {
        if (res) {
          !loop
            ? setProducts(res.data)
            : setProducts([...products, ...res.data]);
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
    if (proviceItem.provices) {
      getProducts(proviceItem.provices.Name, 0);
      if (currentPage > 0) {
        setCureentPage(0);
        return;
      }
    }
  }, [proviceItem]);

  React.useEffect(() => {
    if (currentPage > 0) {
      getProducts(proviceItem.provices.Name, currentPage, true);
      return;
    }
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <View style={styles.groupProduct}>
        {products?.length > 0 && (
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

export default ProductNewList;

const styles = StyleSheet.create({
  container: {},
  groupProduct: {
    flexWrap: 'wrap',
    gap: 15,
    flexDirection: 'row',
    marginTop: 28,
  },
});
