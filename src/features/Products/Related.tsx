import {defaultColors} from '@configs';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {IProduct, getProductsApi} from 'src/api/products';
import {globalStyles} from 'src/commons/globalStyles';
import TextTranslate from 'src/components/TextTranslate';
import ProductsList from 'src/components/product/ProductsList';
import ProductItem from '../Home/components/ProductItem';
import {getArrayToAsyncStorage} from 'src/constants/ayncStorage';
import {storegeKey} from 'src/constants/defines';
import {useListItemProvice} from 'src/redux/provices/hooks';
import {useListWatchedProducts} from 'src/redux/products/hooks';

type EXPLORE_KEY = 'product-same-category' | 'viewed-products';
const ExploreTabKey: {slug: EXPLORE_KEY; name: string}[] = [
  {
    slug: 'product-same-category',
    name: 'product.related.product-same-category',
  },
  {slug: 'viewed-products', name: 'product.related.viewed-products'},
];
interface IProps {
  categoryId: any;
  subCategoryId: any;
  productId: any;
}
const Related = (props: IProps) => {
  const {categoryId, subCategoryId, productId} = props;
  const ListItemprovice = useListItemProvice();
  const listWatchedProducts = useListWatchedProducts();
  const [actionKey, setActionKey] = useState<EXPLORE_KEY>(
    ExploreTabKey[0].slug,
  );
  const [product, setProduct] = useState<IProduct[]>([]);
  const [seeMoreProduct, setSeeMoreProduct] = useState<Boolean>(false);
  const [seeMoreSpec, setSeeMoreSpec] = useState<Boolean>(false);
  const [ViewdProduct, setViewdProduct] = useState<any[]>([]);
  const getProductsByCategory = async (provice: string, productID: any) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: 'id,desc',
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        address: provice,
      };
      const res = await getProductsApi(params);
      if (res) {
        const data = res.data;
        const newProducts = data.filter(it => it.id !== productID);
        setProduct(newProducts);
      }
    } catch (error) {}
  };

  // const getStorage = async () => {
  //   const products = await getArrayToAsyncStorage(storegeKey.PRODUCTS);
  //   if (product) {
  //     setViewdProduct(products);
  //   }
  // };

  const getWatchedProducts = () => {
    setViewdProduct(listWatchedProducts.watchedProducts);
  };

  useEffect(() => {
    if (ListItemprovice) {
      getProductsByCategory(ListItemprovice.provices.Name, productId);
    }
  }, [ListItemprovice, productId]);
  useEffect(() => {
    getWatchedProducts();
    // getStorage();
  }, []);
  return (
    <View style={styles().container}>
      <View style={styles().exploreStyle}>
        {ExploreTabKey.map((it, idx) => {
          return (
            <Pressable
              key={it.slug}
              onPress={() => setActionKey(it.slug)}
              style={styles(actionKey === it.slug).exploreItemStyle}>
              <View style={{paddingLeft: idx === 1 ? 10 : 0}}>
                <TextTranslate
                  fontSize={14}
                  weight="700"
                  color={
                    actionKey === it.slug
                      ? defaultColors.primary
                      : defaultColors.text_626262
                  }
                  text={it.name}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
      <View style={styles().contentStyle}>
        {actionKey === 'product-same-category' && (
          <ProductsList products={product} />
        )}
        {actionKey === 'viewed-products' && (
          <View style={globalStyles.paddingScreenHorizontal}>
            <View style={globalStyles.groupProduct}>
              {(ViewdProduct ?? []).map((it, idx) => {
                return (
                  <ProductItem
                    id={it.id}
                    promo={it.promo}
                    name={it.productNameVn}
                    nameKr={it.productNameKr}
                    totalSoldQuantity={it.totalSoldQuantity}
                    // @ts-ignore
                    images={it.images}
                    categoryId={it.categoryId}
                    subCategoryId={it.subCategoryId}
                    price={it.price}
                    // product={it}
                  />
                );
              })}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Related;

const styles = (
  isAction?: boolean,
  actionKey?: EXPLORE_KEY,
  seeMore?: boolean,
) =>
  StyleSheet.create({
    container: {
      //   paddingHorizontal: 18,
      marginTop: 25,
    },
    exploreStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 18,
    },
    exploreItemStyle: {
      flex: 1,
      height: 40,
      paddingBottom: 4,
      borderBottomWidth: isAction ? 3 : 1,
      borderBottomColor: isAction
        ? defaultColors.bg_FE7D29
        : defaultColors.bg_00C3AB,
    },
    contentStyle: {
      flex: 1,
      //   marginTop: 17,
      //   height: '100%',
      // actionKey === 'product-info'
      //   ? seeMore
      //     ? '100%'
      //     : 150
      //   : seeMore
      //   ? '100%'
      //   : 150,
    },
    buttomGroup: {
      marginTop: 17,
      height: '100%',
    },
  });
