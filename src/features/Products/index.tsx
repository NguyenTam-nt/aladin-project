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
import {IProduct, getProductsApi} from 'src/api/products';

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
  setIdCategory: (id: number) => void;
}

const HeaderProduct = memo((props: PropsHeader) => {
  const {listTextCategories, setIdCategory} = props;
  const {isVn} = useI18n();
  const [itemAction, setItemAction] = useState<IListTextCategories>();
  const handleAction = (item: IListTextCategories) => {
    setItemAction(item);
    setIdCategory(item.id);
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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [listTextCategories, setListTextCategories] = useState<
    IListTextCategories[]
  >([]);
  const [subListCategories, setSubListCategories] = useState<ICategory>();
  const [products, setProducts] = useState<IProduct[]>([]);

  const [idCategory, setIdCategory] = useState<number>();
  const getCategories = async () => {
    try {
      const res = await getCategoriesApi();
      if (res) {
        const data = res.data;
        setCategories(data);
        const listTextCate = data.map(it => {
          return {
            id: it.id,
            name: it.categoryNameVn,
            nameKr: it.categoryNameKr,
          };
        });

        setListTextCategories(listTextCate);
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

  const getProducts = async () => {
    try {
      const params = {
        page: 0,
        size: 10,
        sort: 'promo,desc',
        categoryId: 401,
      };
      const res = await getProductsApi(params);
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  useEffect(() => {
    if (idCategory) {
      getSubListCategories(idCategory);
    }
  }, [idCategory]);

  return (
    <View style={styles.container}>
      <HeaderHome
        headerBase={false}
        children={
          <HeaderProduct
            listTextCategories={listTextCategories}
            setIdCategory={setIdCategory}
          />
        }
      />
      <View style={styles.product_portfolio}>
        <View style={styles.groupButton}>
          <InputSearch containerStyle={styles.styleInput} />
          <CityFilter />
          <CartButton />
        </View>
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
            // style={{...globalStyles.row, columnGap: 8}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    // handleAction(item);
                  }}
                  style={{
                    paddingHorizontal: 8,
                  }}>
                  <CardSubListCategory subCatewgoryItem={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{paddingTop: 27, paddingHorizontal: 14}}>
          <TextTilte text="home.product_sale" />
        </View>
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
  },
  styleInput: {
    flex: 1,
    height: '100%',
  },
});
