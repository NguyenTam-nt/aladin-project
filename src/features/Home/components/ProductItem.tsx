import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {DIMENSION, paddingHorizontalScreen} from '@constants';
import {TextCustom, Thumb} from '@components';
import {ICTickerDiscount} from 'src/assets/icons/ICTickerDiscount';
import {defaultColors} from '@configs';
import {globalStyles} from 'src/commons/globalStyles';
import {formatNumberDotWithVND} from 'src/commons/formatMoney';
import TextTranslate from 'src/components/TextTranslate';
import {Button} from 'src/components/Button';
import {ICCart} from 'src/assets/icons/ICCart';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';
interface IProps {
  id?: any;
  promo?: number;
  name?: string;
  totalSoldQuantity?: number;
}
const ProductItem = (props: IProps) => {
  const {promo, name, totalSoldQuantity, id} = props;
  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        {promo !== 0 && (
          <View style={styles.ticker}>
            <View style={[StyleSheet.absoluteFillObject]}>
              <ICTickerDiscount />
            </View>
            <TextCustom color={defaultColors.c_fff} weight="bold" fontSize={14}>
              -{promo}%
            </TextCustom>
          </View>
        )}
        <View style={styles.styleGroupImage}>
          <Thumb
            style={styles.styleImage}
            source={require('../../../assets/image/home/product.png')}
            resizeMode="cover"
          />
        </View>
        <View style={styles.styleGrouptext}>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: defaultColors.br_E9E9E9,
              paddingTop: 9,
            }}>
            <TextCustom
              fontSize={12}
              weight="400"
              height={32}
              numberOfLines={2}
              color={defaultColors.text_313131}>
              {name}
            </TextCustom>
            <View
              style={[
                globalStyles.row,
                globalStyles.justifyContentBetween,
                {alignItems: 'baseline', marginTop: 2},
              ]}>
              <TextCustom
                fontSize={18}
                weight="800"
                color={defaultColors.primary}>
                {formatNumberDotWithVND(400000)}
              </TextCustom>
              <View style={[globalStyles.row]}>
                <TextTranslate
                  color={defaultColors.text_626262}
                  fontSize={10}
                  weight="400"
                  text="home.sold"
                />
                <TextCustom
                  fontSize={10}
                  weight="400"
                  color={defaultColors.text_626262}>
                  {' '}
                  {totalSoldQuantity}
                </TextCustom>
              </View>
            </View>
            <View
              style={[
                globalStyles.row,
                globalStyles.justifyContentBetween,
                {marginTop: 9},
              ]}>
              <NavLink
                to={{
                  screen: productRoute.detail,
                  params: {
                    idProduct: id,
                  },
                }}>
                <Button text="common.buy_now" />
              </NavLink>
              <TouchableOpacity style={styles.styleCart}>
                <ICCart
                  width={18}
                  height={18}
                  color={defaultColors.bg_00C3AB}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: (DIMENSION.width - paddingHorizontalScreen * 2 - 15) / 2,

    height: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  styleGroupImage: {
    width: '100%',
    height: 157,
  },
  styleImage: {
    width: '100%',
    height: '100%',
  },
  styleGrouptext: {
    marginTop: 9,
    paddingHorizontal: 10,
  },
  containerChild: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: defaultColors.c_fff,
  },
  ticker: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 72,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  styleCart: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: defaultColors.bg_00C3AB,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
