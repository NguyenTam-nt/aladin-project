import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MixedStyleRecord} from 'react-native-render-html';
import {IProductOutStanding, getProductsOutStanding} from 'src/api/products';
import {Html} from 'src/components/Html';
import TextTopic from 'src/components/TextTopic';
import TextTranslate from 'src/components/TextTranslate';
import {Swiper} from 'src/components/rn-swiper/Swiper';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';
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

  const mixedStyle: MixedStyleRecord = {
    body: {
      paddingHorizontal: 16,
      height: 100,
    },
  };

  return (
    <View style={{marginTop: 27, backgroundColor: defaultColors.bg_DAF1E7}}>
      <Swiper
        autoplay
        autoplayDelay={3}
        index={0}
        autoplayLoop
        data={products ?? []}
        renderItem={item => {
          return (
            <View>
              <View key={item.index} style={styles.product}>
                <TextTopic
                  color={defaultColors.primary}
                  fontSize={18}
                  textTransform="uppercase"
                  weight="700"
                  text={
                    isVn ? item.item.productNameVn : item.item.productNameKr
                  }
                  numberOfLines={2}
                />
                <Html
                  tagsStyles={mixedStyle}
                  content={
                    isVn
                      ? item.item.salientFeaturedVn
                      : item.item.salientFeaturedKr
                  }
                />
              </View>
              <View
                style={{
                  // flex: 1,
                  backgroundColor: defaultColors.bg_DAF1E7,
                  // height: 50,
                }}>
                <NavLink
                  to={{
                    screen: productRoute.detail,
                    initial: false,
                    params: {
                      idProduct: item.item.id,
                    },
                  }}
                  style={{
                    justifyContent: 'center',
                    marginVertical: 10,
                    marginLeft: 16,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: defaultColors.bg_00C3AB,
                    width: 150,
                    height: 40,
                  }}>
                  <TextTranslate
                    textAlign="center"
                    color={defaultColors.bg_00C3AB}
                    fontSize={18}
                    weight="700"
                    text={'common.see-more'}
                  />
                </NavLink>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProductOutStanding;
const styles = StyleSheet.create({
  product: {
    // backgroundColor: defaultColors._014F59,
    // marginLeft: 16,
    height: 260,
    width: DIMENSION.width,
    borderTopLeftRadius: 20,
    // paddingRight: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    // paddingBottom: 14,
    marginBottom: 10,
  },
});
