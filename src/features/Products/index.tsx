import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import {defaultColors} from '@configs';
import HeaderHome from '../Home/components/HeaderHome';
import {memo, useEffect, useState} from 'react';
import React from 'react';
import {paddingHorizontalScreen} from '@constants';
import useI18n from 'src/hooks/useI18n';
import {TextCustom} from '@components';
import {
  ICategory,
  getCategoriesApi,
  getCategororyByIDApi,
} from 'src/api/category';
import InputSearch from 'src/components/InputSearch';
import CityFilter from 'src/components/CityFilter';
import CartButton from 'src/components/CartButton';
import TextTranslate from 'src/components/TextTranslate';
import CardSubListCategory from './CardSubListCategory';
import TextTilte from 'src/components/TextTitle';
import {
  IProduct,
  IProductOutStanding,
  getProductsApi,
  getProductsOutStanding,
} from 'src/api/products';
import ProductsList from 'src/components/product/ProductsList';
import FeaturedComponents from 'src/components/FeaturedComponents';
import SpaceBottom from 'src/components/SpaceBottom';
import FilterBy, {FILTER_BY} from 'src/components/FilterBy';
import ContactTopic from '../Home/components/ContactTopic';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';

const TextHeader = (props: {
  text: string;
  idx: number;
  itemAction: IListTextCategories;
}) => {
  const {text, idx, itemAction} = props;
  return (
    <View style={idx === itemAction?.id ? styles.textHeader : null}>
      <TextCustom fontSize={14} weight="600" color={defaultColors.bg_EFEFEF}>
        {text}
      </TextCustom>
    </View>
  );
};

interface IListTextCategories {
  id: any;
  name: string;
  nameKr: string;
}
interface PropsHeader {
  listTextCategories: IListTextCategories[];
  setCategoryItem: (id: any) => void;
}

const HeaderProduct = memo((props: PropsHeader) => {
  const {listTextCategories, setCategoryItem} = props;
  const {isVn} = useI18n();
  const [itemAction, setItemAction] = useState<IListTextCategories>();
  const handleAction = (item: IListTextCategories) => {
    setItemAction(item);
    setCategoryItem(item);
  };
  useEffect(() => {
    if (listTextCategories.length > 0) {
      setItemAction(listTextCategories[0]);
      // setIdCategory(listTextCategories[0].id);
    }
  }, [listTextCategories]);
  return (
    <View style={styles.groupContent}>
      <FlatList
        data={listTextCategories ?? []}
        // style={{...globalStyles.row, columnGap: 8}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleAction(item);
              }}
              style={{
                paddingHorizontal: 8,
              }}>
              <TextHeader
                text={isVn ? item.name : item.nameKr}
                idx={item.id}
                itemAction={itemAction}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const Products = () => {
  const {isVn} = useI18n();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [listTextCategories, setListTextCategories] = useState<
    IListTextCategories[]
  >([]);
  const [subListCategories, setSubListCategories] = useState<ICategory>();
  const [productsSale, setProductsSale] = useState<IProduct[]>([]);
  const [productsOutStanding, setProductsOutStanding] = useState<
    IProductOutStanding[]
  >([]);
  const [productsSortBy, setProductsSortBy] = useState<IProduct[]>([]);
  const [categoryItem, setCategoryItem] = useState<{
    id: number;
    name: string;
    nameKr: string;
  }>();
  const [filterByItem, setFilterByItem] = useState<string>(FILTER_BY[0].slug);
  const getCategories = async () => {
    try {
      const res = await getCategoriesApi();
      if (res) {
        const data = res.data;
        // setCategories(data);
        const listTextCate = data.map(it => {
          return {
            id: it.id,
            name: it.categoryNameVn,
            nameKr: it.categoryNameKr,
          };
        });
        if (listTextCate.length > 0) {
          setListTextCategories(listTextCate);
          setCategoryItem(listTextCate[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubListCategories = async (id: number) => {
    try {
      const res = await getCategororyByIDApi(id);
      if (res) {
        setSubListCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsSale = async (idCategory: number) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: 'promo,desc',
        categoryId: idCategory,
      };
      const res = await getProductsApi(params);
      setProductsSale(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductOutStanding = async (id: number) => {
    try {
      const params = {
        page: 0,
        size: 15,
        sort: 'createAt,desc',
        categoryId: id,
      };
      const res = await getProductsOutStanding(params);
      if (res.success) {
        setProductsOutStanding(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsSortBy = async (
    idCategory: number,
    keyfilterByItem: string,
  ) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: keyfilterByItem,
        categoryId: idCategory,
      };
      const res = await getProductsApi(params);
      if (res) {
        setProductsSortBy(res.data);
      }
      // setProductsSale(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (categoryItem) {
      getSubListCategories(categoryItem.id);
      getProductOutStanding(categoryItem.id);
      getProductsSale(categoryItem.id);
    }
  }, [categoryItem]);

  useEffect(() => {
    if (categoryItem) {
      getProductsSortBy(categoryItem.id, filterByItem);
    }
  }, [categoryItem, filterByItem]);

  return (
    <View style={styles.container}>
      <HeaderHome
        headerBase={false}
        children={
          <HeaderProduct
            listTextCategories={listTextCategories}
            setCategoryItem={setCategoryItem}
          />
        }
      />
      <View style={styles.product_portfolio}>
        <View style={styles.groupButton}>
          <InputSearch containerStyle={styles.styleInput} />
          <CityFilter />
          <CartButton />
        </View>
        <View>
          <TextTranslate
            color={defaultColors.bg_00C3AB}
            fontSize={18}
            textTransform="uppercase"
            weight="700"
            text="product.product-protfolio"
          />
          <View style={{marginTop: 7}}>
            <FlatList
              data={subListCategories?.subCategoryList ?? []}
              renderItem={({item, index}) => {
                return (
                  <NavLink
                    to={{
                      screen: productRoute.categories.detail,
                      params: {
                        idSubCategory: item.id,
                        idCategory: categoryItem?.id,
                      },
                    }}
                    style={{
                      paddingHorizontal: 8,
                    }}>
                    <CardSubListCategory subCatewgoryItem={item} />
                  </NavLink>
                );
              }}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop: 10}}>
          {productsSale.length > 0 && (
            <ProductsList
              products={productsSale}
              textTile="home.product_sale"
            />
          )}
          <View style={{marginTop: 17}}>
            {productsOutStanding.length > 0 && (
              <FeaturedComponents data={productsOutStanding} />
            )}
          </View>
          <View style={{marginTop: 27, paddingHorizontal: 18}}>
            <TextTilte
              text={isVn ? categoryItem?.name : categoryItem?.nameKr}
            />
            <FilterBy
              setFilterByItem={setFilterByItem}
              filterByItem={filterByItem}
            />
          </View>
          {productsSortBy.length > 0 && (
            <ProductsList products={productsSortBy} />
          )}
          <ContactTopic />
        </View>
        <SpaceBottom />
      </ScrollView>
    </View>
  );
};

export default Products;
const styles = StyleSheet.create({
  container: {
    ...globalStyles.fullFill,
    backgroundColor: defaultColors.bg_EFEFEF,
    position: 'relative',
    flex: 1,
  },
  groupContent: {
    paddingHorizontal: paddingHorizontalScreen,
    // paddingTop: 19,
  },
  textHeader: {
    borderBottomColor: defaultColors._00D2B8,
    borderBottomWidth: 2,
    height: 21,
  },
  groupButton: {
    ...globalStyles.row,
    columnGap: 12,
    paddingBottom: 24,
  },
  product_portfolio: {
    paddingHorizontal: 9,
    paddingTop: 28,
    paddingBottom: 27,
  },
  styleInput: {
    flex: 1,
    height: '100%',
  },
});
