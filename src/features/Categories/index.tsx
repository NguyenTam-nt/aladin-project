import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ISubCategoryList, getCategororyByIDApi} from 'src/api/category';
import {IProduct, getProductsApi} from 'src/api/products';
import FilterBy, {FILTER_BY} from 'src/components/FilterBy';
import HeaderBack from 'src/components/Header/HeaderBack';
import SpaceBottom from 'src/components/SpaceBottom';
import TextTilte from 'src/components/TextTitle';
import TextTranslate from 'src/components/TextTranslate';
import ProductsList from 'src/components/product/ProductsList';
import useI18n from 'src/hooks/useI18n';
import {useListWatchedProducts} from 'src/redux/products/hooks';
import {useListItemProvice} from 'src/redux/provices/hooks';
import ProductItem from '../Home/components/ProductItem';

const CategoriesScreen = () => {
  const router = useRoute();
  const {isVn} = useI18n();
  const proviceItem = useListItemProvice();
  const listWatchedProducts = useListWatchedProducts();
  //@ts-ignore
  const idCategory = router.params?.idCategory;
  //@ts-ignore
  const idSubCategory = router.params?.idSubCategory;
  const [subCategory, setSubCategory] = useState<ISubCategoryList>();
  const [filterByItem, setFilterByItem] = useState<string>(FILTER_BY[0].slug);
  const [productsSortBy, setProductsSortBy] = useState<IProduct[]>([]);
  const getCategoryID = async (id: any, idSubCate: any) => {
    try {
      const res = await getCategororyByIDApi(id);
      if (res) {
        const data = res.data;
        const subCategorydata = data.subCategoryList.find(
          it => it.id === idSubCate,
        );
        setSubCategory(subCategorydata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsByCategory = async (keyfilterByItem: string) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: keyfilterByItem,
        categoryId: idCategory,
        subCategoryId: idSubCategory,
        address: proviceItem.provices.Name,
      };
      const res = await getProductsApi(params);
      if (res) {
        setProductsSortBy(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (idCategory && idSubCategory) {
      getCategoryID(idCategory, idSubCategory);
    }
  }, [idCategory, idSubCategory]);

  useEffect(() => {
    getProductsByCategory(filterByItem);
  }, [filterByItem]);

  return (
    <View style={styles.container}>
      <HeaderBack
        textTile={
          isVn ? subCategory?.subCategoryNameVn : subCategory?.subCategoryNameKr
        }
      />
      <ScrollView>
        <View style={{}}>
          <FilterBy
            setFilterByItem={setFilterByItem}
            filterByItem={filterByItem}
          />

          {productsSortBy.length > 0 && (
            <ProductsList products={productsSortBy} />
          )}
        </View>
        <View style={styles.viewedProduct}>
          <TextTilte text="product.viewed-product" />
          <View style={styles.groupProduct}>
            {(listWatchedProducts.watchedProducts ?? []).map((it, idx) => {
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
        <View style={styles.note}>
          <View
            style={{
              paddingBottom: 3,
              borderBottomWidth: 1,
              borderBottomColor: defaultColors.bg_FF6B00,
              marginBottom: 20,
            }}>
            <TextCustom
              fontSize={16}
              color={defaultColors.text_313131}
              numberOfLines={2}
              weight="700">
              <TextTranslate
                fontSize={16}
                color={defaultColors.text_313131}
                weight="700"
                text="product.note-when-using"
              />{' '}
              {isVn
                ? subCategory?.subCategoryNameVn
                : subCategory?.subCategoryNameKr}
            </TextCustom>
          </View>
          <TextCustom
            fontSize={14}
            color={defaultColors.text_313131}
            weight="700">
            {isVn ? subCategory?.noteSubVn : subCategory?.noteSubKr}
          </TextCustom>
        </View>
        <SpaceBottom />
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;
const styles = StyleSheet.create({
  container: {flex: 1},
  filterStyle: {
    paddingHorizontal: 15,
    // marginTop: 13,
  },
  viewedProduct: {
    marginTop: 35,
    paddingHorizontal: 16,
  },
  note: {
    paddingHorizontal: 15,
    marginTop: 25,
    marginBottom: 2,
    // borderBottomWidth: 1,
    // borderBottomColor: defaultColors.bg_FF6B00,
  },
  groupProduct: {
    flexWrap: 'wrap',
    gap: 15,
    flexDirection: 'row',
    marginTop: 28,
  },
});
