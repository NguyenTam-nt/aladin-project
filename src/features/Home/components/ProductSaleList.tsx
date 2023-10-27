import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IProduct, getProductsApi} from 'src/api/products';
import ProductsList from 'src/components/product/ProductsList';
import {useListItemProvice} from 'src/redux/provices/hooks';
import {defaultColors} from '@configs';
import {TouchableOpacity} from 'react-native';
import TextTranslate from 'src/components/TextTranslate';
import {boolean} from 'yup';

const ProductSaleList = () => {
  const SIZE = 10;
  const proviceItem = useListItemProvice();
  const [productsSale, setProductsSale] = useState<IProduct[]>([]);
  const [currentPage, setCureentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false);
  const getProductsSale = async (
    provice: string,
    page: number,
    loop?: boolean,
  ) => {
    setAction(true);
    try {
      const params = {
        page: page,
        size: SIZE,
        sort: 'promo,desc',
        address: provice,
      };
      const res = await getProductsApi(params);
      if (res) {
        !loop
          ? setProductsSale(res.data)
          : setProductsSale([...productsSale, ...res.data]);
        setTotalPages(res?.page?.max ?? 0);
        // setProductsSale([...productsSale, ...res.data]);
        // setTotalPages(res?.page?.max ?? 0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAction(false);
    }
  };

  useEffect(() => {
    if (proviceItem.provices) {
      if (productsSale.length > 0) {
        if (currentPage === 0) {
          getProductsSale(proviceItem.provices.Name, 0);
          return;
        } else if (currentPage > 0) {
          setCureentPage(0);
          return;
        }
      }
    }
  }, [proviceItem]);

  useEffect(() => {
    if (proviceItem) {
      getProductsSale(proviceItem.provices.Name, currentPage, true);
      return;
    }
  }, [currentPage]);

  return (
    <View style={{}}>
      {/* <TextTilte text="home.product_sale" /> */}
      <View style={styles.groupProduct}>
        {productsSale.length > 0 && (
          <ProductsList products={productsSale} textTile="home.product_sale" />
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

export default ProductSaleList;

const styles = StyleSheet.create({
  groupProduct: {
    flexWrap: 'wrap',
    gap: 15,
    flexDirection: 'row',
    marginTop: 28,
  },
});
