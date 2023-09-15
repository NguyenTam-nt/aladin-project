import {defaultColors} from '@configs';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {MixedStyleRecord} from 'react-native-render-html';
import {IProductOutStanding, getProductsOutStanding} from 'src/api/products';
import {Html} from 'src/components/Html';
import TextTopic from 'src/components/TextTopic';
import {Swiper} from 'src/components/rn-swiper/Swiper';
import useI18n from 'src/hooks/useI18n';

const ProductOutStanding = () => {
  const [products, setProducts] = useState<IProductOutStanding[]>([]);
  
  const {isVn} = useI18n();
  const getProducts = async () => {
    const params = {
      page: 0,
      size: 15,
      sort: 'createAt,desc',
    };
    const res = await getProductsOutStanding(params);
    if (res.success) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log({products});
  
  const mixedStyle: MixedStyleRecord = {
    body: {
      paddingHorizontal: 16,
      marginTop: 12,
      height: 180,
    },
  };

  return (
    <View style={{marginTop: 27}}>
      <Swiper
        autoplay
        autoplayDelay={2}
        autoplayLoop
      >
        {products.map((it, idx) => {
          return (
            <View key={idx} style={styles.product}>
              <TextTopic
                color={defaultColors.primary}
                fontSize={18}
                textTransform="uppercase"
                weight="700"
                text={isVn ? it.productNameVn : it.productNameKr}
              />
              <View style={{height: 180}}>
                <Html
                  tagsStyles={mixedStyle}
                  content={isVn ? it.salientFeaturedVn : it.salientFeaturedKr}
                />
              </View>
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};
const { width } = Dimensions.get('window');
export default ProductOutStanding;
const styles = StyleSheet.create({
  product: {
    backgroundColor: defaultColors._014F59,
    paddingLeft: 16,
    height: 268,
    width: width,
    borderTopLeftRadius: 20,
  },
});
