import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Thumb} from '@components';
import {defaultColors} from '@configs';
import {paddingHorizontalScreen} from '@constants';
import TextTranslate from 'src/components/TextTranslate';
import ProductItemOutStanding from './ProductItemOutStanding';
import {productImageOutStanding} from 'src/assets/image';

const ProductOutStandingList = () => {
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
          data={[1, 2, 3, 4]}
          style={{marginTop: 12}}
          renderItem={({item, index}) => {
            return (
              <ProductItemOutStanding index={`00${index + 1}`.slice(-2)} />
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

export default ProductOutStandingList;

const styles = StyleSheet.create({
  container: {position: 'relative', marginTop: 26},
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
