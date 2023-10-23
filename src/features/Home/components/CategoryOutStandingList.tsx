import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Thumb} from '@components';
import {defaultColors} from '@configs';
import {paddingHorizontalScreen} from '@constants';
import TextTranslate from 'src/components/TextTranslate';
import CategorytItemOutStanding from './CategorytItemOutStanding';
import {productImageOutStanding} from 'src/assets/image';
import {ICategory, getCategoriesApi} from 'src/api/category';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';

const CategoryOutStandingList = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const getCategories = async () => {
    const res = await getCategoriesApi();
    if (res.success) {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.image_banner}>
        <Thumb
          style={styles.styleImage}
          source={productImageOutStanding}
          resizeMode="cover"
        />
      </View>
      <View style={styles.groupContent}>
        <TextTranslate
          color={defaultColors.c_fff}
          fontSize={18}
          textTransform="uppercase"
          weight="700"
          text="home.product_outstanding"
        />
        <FlatList
          data={categories ?? []}
          style={{marginTop: 12}}
          renderItem={({item, index}) => {
            return (
              // <NavLink
              //   to={{
              //     screen: productRoute.categories.detail,
              //     params: {
              //       idSubCategory: item.id,
              //       idCategory: item,
              //     },
              //   }}>
              <CategorytItemOutStanding
                index={`00${index + 1}`.slice(-2)}
                data={item}
              />
              // </NavLink>
            );
          }}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CategoryOutStandingList;

const styles = StyleSheet.create({
  container: {position: 'relative'},
  image_banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 168,
    backgroundColor: 'red',
  },
  styleImage: {width: '100%', height: '100%'},
  groupContent: {
    paddingHorizontal: paddingHorizontalScreen,
    paddingTop: 19,
  },
});
