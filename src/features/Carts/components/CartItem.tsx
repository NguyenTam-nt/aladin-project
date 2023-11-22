import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICISCheckbox} from 'src/assets/icons/ICISCheckbox';
import {formatNumberDotWithVND} from 'src/commons/formatMoney';
import AmountCartItem from './AmountCartItem';
import {ICRemove} from 'src/assets/icons/ICRemove';
import {IITemCart} from 'src/redux/orderCart/slice';
import useI18n from 'src/hooks/useI18n';
import {ICNOCheckbox} from 'src/assets/icons/ICNOCheckox';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';
import TextTranslate from 'src/components/TextTranslate';

interface IProps {
  product: IITemCart;
  handleCheckbox: (productDetailId: number, choose: boolean) => void;
  handleUpdateQuantitySelected: (
    productDetailId: number,
    quantitySelected: number,
  ) => void;
  removeItem: (id: number) => void;
}

const CartItem = (props: IProps) => {
  const {product, handleCheckbox, handleUpdateQuantitySelected, removeItem} =
    props;
  const {isVn} = useI18n();

  const handleChangeCheckBox = () => {
    handleCheckbox(product.productDetailId, !product?.choose);
  };
  const handleUodateQuantity = (type: 'DECREASE' | 'INCREASE') => {
    type === 'DECREASE'
      ? handleUpdateQuantitySelected(
          product?.productDetailId,
          product?.quantitySelected - 1,
        )
      : handleUpdateQuantitySelected(
          product?.productDetailId,
          product?.quantitySelected + 1,
        );
  };

  return (
    <View
      style={[
        styles.cartContainer,
        product.stockQuantity == 0 && {opacity: 0.5},
      ]}>
      {product.stockQuantity == 0 && (
        <View style={{position: 'absolute', bottom: 20, left: 10}}>
          <TextTranslate
            fontSize={14}
            numberOfLines={2}
            color={defaultColors.primary}
            weight="400"
            text="cart.out-row"
          />
        </View>
      )}
      <View style={styles.cartPreview}>
        <View style={styles.styleCheckBox}>
          <TouchableOpacity
            disabled={product.stockQuantity == 0 ? true : false}
            onPress={handleChangeCheckBox}>
            {product.choose ? <ICISCheckbox /> : <ICNOCheckbox />}
          </TouchableOpacity>
        </View>
        <Thumb
          style={styles.styleImage}
          source={{
            uri: product.imageDetailUrl,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cartContentItem}>
        <View style={styles.styleProductDetail}>
          <NavLink
            to={{
              screen: productRoute.detail,
              initial: false,
              params: {
                idProduct: product.productId,
              },
            }}>
            <TextCustom
              fontSize={14}
              numberOfLines={2}
              color={defaultColors.text_313131}
              weight="400">
              {isVn ? product.productDetailNameVn : product.productDetailNameKr}
            </TextCustom>
            <TextCustom
              numberOfLines={1}
              fontSize={14}
              color={defaultColors.bg_939393}
              weight="400">
              {product.addressWarehouse}
              {', '}
              {isVn
                ? product?.attributes?.[0].valueVn
                : product?.attributes?.[0].valueKr}
            </TextCustom>
            <TextCustom
              fontSize={14}
              color={defaultColors.primary}
              weight="700">
              {formatNumberDotWithVND(
                product.actualPriceDetail * product.quantitySelected,
              )}
            </TextCustom>
          </NavLink>
        </View>
        <View style={styles.styleGroupButtonAction}>
          <AmountCartItem
            quanlity={product.quantitySelected}
            quantityDefault={product.stockQuantity}
            handleUodateQuantity={handleUodateQuantity}
            disable={product.stockQuantity == 0 ? true : false}
          />
          <TouchableOpacity
            style={{zIndex: 9999}}
            onPress={() => removeItem(product.productDetailId)}>
            <View style={styles.styleRemove}>
              <ICRemove />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartContainer: {
    width: '100%',
    height: 123,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 4,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,

    paddingHorizontal: 18,
    position: 'relative',
  },
  cartPreview: {
    flexDirection: 'row',
    columnGap: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContentItem: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    rowGap: 5,
  },
  styleProductDetail: {
    width: '100%',
    flexDirection: 'column',
    rowGap: 2,
    paddingVertical: 5,
    paddingLeft: 5,
    borderLeftColor: defaultColors.br_E9E9E9,
    borderLeftWidth: 1,
  },
  styleGroupButtonAction: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleImage: {
    marginTop: 2,
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  styleCheckBox: {
    width: 20,
    height: '100%',
  },
  styleRemove: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
