import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {DIMENSION, paddingHorizontalScreen} from '@constants';
import {TextCustom, Thumb} from '@components';
import {ICTickerDiscount} from 'src/assets/icons/ICTickerDiscount';
import {defaultColors} from '@configs';
import {globalStyles} from 'src/commons/globalStyles';
import {formatNumberDotWithVND} from 'src/commons/formatMoney';
import TextTranslate from 'src/components/TextTranslate';
import {ICCart} from 'src/assets/icons/ICCart';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';
import {ButtonNavigate} from 'src/components/Buttons/ButtonNavigate';
import {
  getArrayToAsyncStorage,
  setArrayToAsyncStorage,
} from 'src/constants/ayncStorage';
import {storegeKey} from 'src/constants/defines';
import useI18n from 'src/hooks/useI18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IProduct} from 'src/api/products';

interface IProps {
  id?: any;
  promo?: number;
  name?: string;
  nameKr?: string;
  totalSoldQuantity?: number;
  images: {
    url: string;
  }[];
  categoryId?: any;
  subCategoryId?: any;
  price: any;
  product: IProduct;
}
const ProductItem = (props: IProps) => {
  const {isVn} = useI18n();
  const {
    promo,
    name,
    nameKr,
    totalSoldQuantity,
    id,
    images,
    categoryId,
    subCategoryId,
    price,
    product,
  } = props;
  const handleAddStorage = async () => {
    const newData = {
      id: id,
      promo: promo,
      productNameVn: name,
      productNameKr: nameKr,
      totalSoldQuantity: totalSoldQuantity,
      images: images,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      price: price,
      createAt: new Date(),
    };

    try {
      const datas = await getArrayToAsyncStorage(storegeKey.PRODUCTS);

      if (datas === null || datas === undefined) {
        const viewedProducts = [];
        viewedProducts.push(newData);
        setArrayToAsyncStorage(storegeKey.PRODUCTS, viewedProducts);
      } else if (datas) {
        const viewedProducts = datas.filter((it: any) => it.id !== id);

        viewedProducts.unshift(newData);
        setArrayToAsyncStorage(storegeKey.PRODUCTS, viewedProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sum = product?.productDetails.reduce((accumulator, object) => {
    return accumulator + object.stockQuantity;
  }, 0);

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
        {sum == 0 && (
          <View style={styles.styleOutOfStock}>
            <TextTranslate
              fontSize={16}
              weight="700"
              color={defaultColors.c_fff}
              text="common.out-of-stock"
            />
          </View>
        )}

        <View style={styles.styleGroupImage}>
          <Thumb
            style={styles.styleImage}
            //@ts-ignore
            source={{uri: images?.length > 0 && images?.[0].url}}
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
              {isVn ? name : nameKr}
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
                {formatNumberDotWithVND(price)}
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
                  {totalSoldQuantity == 0 || totalSoldQuantity == null
                    ? 0
                    : totalSoldQuantity}
                </TextCustom>
              </View>
            </View>
            <View
              style={[
                globalStyles.row,
                globalStyles.justifyContentBetween,
                {marginTop: 9},
              ]}>
              {sum == 0 ? (
                <ButtonNavigate text="common.buy_now" />
              ) : (
                <NavLink
                  to={{
                    screen: productRoute.detail,
                    params: {
                      idProduct: id,
                      categoryId: categoryId,
                      subCategoryId: subCategoryId,
                    },
                  }}
                  handleOnPress={() => handleAddStorage()}
                  // onPress={() => console.log('product item')}
                >
                  <ButtonNavigate text="common.buy_now" />
                </NavLink>
              )}
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
    position: 'relative',
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
    // position: 'relative',
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
  styleOutOfStock: {
    backgroundColor: defaultColors.bg_2E4D44,
    position: 'absolute',
    height: 157,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 9999,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
