import {paddingHorizontalScreen} from '@constants';
import {FlatList, StyleSheet, View} from 'react-native';
import {productImageOutStanding} from 'src/assets/image';
import {Thumb} from './Thumb/Thumb';
import React from 'react';
import TextTranslate from './TextTranslate';
import {defaultColors} from '@configs';
import {IProductOutStanding} from 'src/api/products';
import useI18n from 'src/hooks/useI18n';
import FeaturedItem from './FeaturedItem';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';
interface IProps {
  data: IProductOutStanding[];
}
const FeaturedComponents = (props: IProps) => {
  const {data} = props;
  const {isVn} = useI18n();
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
          data={data ?? []}
          style={{marginTop: 12}}
          renderItem={({item, index}) => {
            return (
              <NavLink
                key={index}
                to={{
                  screen: productRoute.detail,
                  initial: false,
                  params: {
                    idProduct: item.id,
                  },
                }}>
                <FeaturedItem
                  index={`00${index + 1}`.slice(-2)}
                  name={isVn ? item.productNameVn : item.productNameKr}
                  imageLink={item.image}
                  // idProduct={item.id}
                />
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

export default FeaturedComponents;
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
