import {defaultColors} from '@configs';
import {paddingHorizontalScreen} from '@constants';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ICaterorySub, getCategoriesBySub} from 'src/api/category';
import TextTranslate from 'src/components/TextTranslate';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';
import CardSubListCategory from 'src/features/Products/CardSubListCategory';

const CategoriesList = () => {
  const [categories, sertcatdegories] = useState<ICaterorySub[]>([]);

  const getCategories = async () => {
    try {
      const res = await getCategoriesBySub();

      if (res) {
        sertcatdegories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <View style={styles.groupContent}>
      <TextTranslate
        fontSize={18}
        weight="700"
        color={defaultColors.bg_00C3AB}
        text="product.product-protfolio"
      />
      <View style={{marginTop: 16}}>
        <FlatList
          data={categories ?? []}
          renderItem={({item, index}) => {
            return (
              <NavLink
                key={index}
                to={{
                  screen: productRoute.categories.detail,
                  params: {
                    idSubCategory: item.id,
                    idCategory: item.categoryId,
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
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {},
  groupContent: {
    paddingHorizontal: paddingHorizontalScreen,
    // paddingTop: 19,
  },
});
