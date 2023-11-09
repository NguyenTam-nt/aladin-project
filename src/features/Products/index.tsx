import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import {defaultColors} from '@configs';
import HeaderHome from '../Home/components/HeaderHome';
import {memo, useEffect, useRef, useState} from 'react';
import React from 'react';
import {DIMENSION, paddingHorizontalScreen} from '@constants';
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
import ImperativeScrollView, {
  ImperativeScrollViewHandles,
} from 'src/hooks/useImperativeScrollView';
import {useListItemProvice} from 'src/redux/provices/hooks';
import {useRoute} from '@react-navigation/native';
import {BgProduct} from 'src/assets/image';

export const TextHeader = (props: {
  text: string;
  idx: number;
  itemAction: any;
}) => {
  const {text, idx, itemAction} = props;
  return (
    <View style={idx === itemAction ? styles.textHeader : null}>
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
  onTopScroll: () => void;
  idCategory: any;
}

const HeaderProduct = memo((props: PropsHeader) => {
  const {listTextCategories, setCategoryItem, onTopScroll, idCategory} = props;
  const myListRef = useRef();
  const {isVn} = useI18n();
  const [itemAction, setItemAction] = useState<any>(idCategory ?? undefined);
  const handleAction = (item: IListTextCategories) => {
    setItemAction(item.id);
    setCategoryItem(item);
  };
  useEffect(() => {
    if (listTextCategories.length > 0) {
      if (!idCategory) {
        setItemAction(listTextCategories[0].id);
      }
    }
  }, [listTextCategories]);

  // const currentIndex = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (listTextCategories.length > 0 && idCategory) {
      //@ts-ignore
      myListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (listTextCategories.length > 0 && idCategory) {
        const index = listTextCategories.findIndex(it => it.id == idCategory);
        if (index >= 0) {
          setCurrentIndex(index);
        } else {
          setCurrentIndex(0);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex, listTextCategories]);
  return (
    <View style={styles.groupContent}>
      <FlatList
        //@ts-ignore
        ref={myListRef}
        data={listTextCategories ?? []}
        // style={{...globalStyles.row, columnGap: 8}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleAction(item);
                onTopScroll();
              }}
              style={{
                paddingHorizontal: 8,
              }}>
              <TextHeader
                text={isVn ? item.name : item.nameKr}
                idx={item.id}
                // @ts-ignore
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
  const routers = useRoute();
  const params = routers.params;
  //@ts-ignore
  const idCategory = params?.idCategory;
  const proviceItem = useListItemProvice();
  const scrollViewRef = useRef<ImperativeScrollViewHandles>(null);
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
  } | null>();
  const [filterByItem, setFilterByItem] = useState<string>(FILTER_BY[0].slug);
  const getCategories = async () => {
    try {
      const res = await getCategoriesApi();
      if (res) {
        const data = res.data;
        const listTextCate = data.map(it => {
          return {
            id: it.id,
            name: it.categoryNameVn,
            nameKr: it.categoryNameKr,
          };
        });
        if (listTextCate.length > 0) {
          setListTextCategories(listTextCate);
          if (!idCategory) {
            setCategoryItem(listTextCate[0]);
          }
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

  const getProductsSale = async (idCategory: number, provice: string) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: 'promo,desc',
        categoryId: idCategory,
        address: provice,
      };
      const res = await getProductsApi(params);
      setProductsSale(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductOutStanding = async (id: number, provice: string) => {
    try {
      const params = {
        page: 0,
        size: 15,
        categoryId: id,
        address: provice,
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
    provice: string,
  ) => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: keyfilterByItem,
        categoryId: idCategory,
        address: provice,
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

  const onTopScroll = () => {
    scrollViewRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (idCategory && categoryItem == null) {
      getSubListCategories(idCategory);
      return;
    }
    if (categoryItem) {
      getSubListCategories(categoryItem.id);
      return;
    }
  }, [categoryItem, idCategory]);
  useEffect(() => {
    if (idCategory && categoryItem == null) {
      const proviceNam = proviceItem.provices.Name;
      getProductOutStanding(idCategory, proviceNam);
      getProductsSale(idCategory, proviceNam);
      return;
    }
    if (categoryItem) {
      const proviceNam = proviceItem.provices.Name;
      getProductOutStanding(categoryItem.id, proviceNam);
      getProductsSale(categoryItem.id, proviceNam);
      return;
    }
  }, [categoryItem, idCategory, proviceItem]);

  useEffect(() => {
    if (idCategory && categoryItem == null) {
      getProductsSortBy(idCategory, filterByItem, proviceItem.provices.Name);
      return;
    }
    if (categoryItem) {
      getProductsSortBy(
        categoryItem.id,
        filterByItem,
        proviceItem.provices.Name,
      );
      return;
    }
  }, [categoryItem, idCategory, filterByItem, proviceItem]);

  return (
    <View style={styles.container}>
      <HeaderHome
        headerBase={false}
        children={
          <HeaderProduct
            listTextCategories={listTextCategories}
            setCategoryItem={setCategoryItem}
            onTopScroll={onTopScroll}
            idCategory={idCategory}
          />
        }
      />
      <ImageBackground
        source={BgProduct}
        resizeMode="cover"
        //@ts-ignore
        style={{height: '100%', with: DIMENSION.width * 0.5}}>
        <View style={styles.product_portfolio}>
          <View style={styles.groupButton}>
            <InputSearch
              containerStyle={styles.styleInput}
              isProductScreen={true}
            />

            <CityFilter
              //@ts-ignore
              isProductScreen={true}
            />
            <CartButton
              //@ts-ignore
              isProductSreecn={true}
            />
          </View>
        </View>
        <ImperativeScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 9, paddingBottom: 24}}>
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
          <View style={{marginTop: 10}}>
            {productsSale.length > 0 && (
              <ProductsList
                products={productsSale}
                textTile="home.product_sale"
              />
            )}

            {productsOutStanding.length > 0 && (
              <View style={{marginTop: 17}}>
                <FeaturedComponents data={productsOutStanding} />
              </View>
            )}
            <View style={{marginTop: 27, paddingHorizontal: 18}}>
              <TextTilte
                //@ts-ignore
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
          <SpaceBottom />
        </ImperativeScrollView>
      </ImageBackground>
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
    zIndex: 9999,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  product_portfolio: {
    paddingHorizontal: 9,
    paddingTop: 28,
  },
  styleInput: {
    flex: 1,
    height: '100%',
  },
});
