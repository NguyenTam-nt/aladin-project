import { TextCustom } from '@components';
import { BOTTOM_BAR_HEIGHT, defaultColors } from '@configs';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { ICISCheckbox } from 'src/assets/icons/ICISCheckbox';
import { ICRemove } from 'src/assets/icons/ICRemove';
import HeaderBack from 'src/components/Header/HeaderBack';
import {
  useHandleSetChoose,
  useHandleSetChooseAll,
  useHandleUpdateQuantitySelectedInCart,
  useListItemCart,
} from 'src/redux/orderCart/hooks';
import CartItem from './components/CartItem';
import { ICNOCheckbox } from 'src/assets/icons/ICNOCheckox';
import TextTranslate from 'src/components/TextTranslate';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import { getVoucherApplyProductApi } from 'src/api/voucher';
import { formatNumberDotWithO } from 'src/commons/formatMoney';
import { ICBuyNow } from 'src/assets/icons/ICBuyNow';

const CartsScreen = () => {
  const listItemCart = useListItemCart();
  const handleSetChooseAll = useHandleSetChooseAll();
  const handleSetChoose = useHandleSetChoose();
  const handleUpdateQuantity = useHandleUpdateQuantitySelectedInCart();
  const { t } = useTranslation();

  const handleCheckAll = () => {
    const newListCarts = [...listItemCart.itemInCart];
    const chooseAll = newListCarts.map((it, idx) => {
      return {
        ...it,
        choose: checkedAll ? false : true,
      };
    });
    handleSetChooseAll(chooseAll);
  };

  const handleCheckbox = (productDetailId: number, choose: boolean) => {
    const dataObj = {
      productDetailId,
      choose,
    };
    handleSetChoose(dataObj);
  };

  const handleUpdateQuantitySelected = (
    productDetailId: number,
    quantitySelected: number,
  ) => {
    const dataObj = {
      productDetailId,
      quantitySelected,
    };

    handleUpdateQuantity(dataObj);
  };

  const checkedAll = useMemo(() => {
    if (!listItemCart.itemInCart.length) {
      return false;
    }
    return !listItemCart.itemInCart.some(item => !item.choose);
  }, [listItemCart.itemInCart]);

  const handleVoucherApply = async () => {
    try {
      const ids = listItemCart.itemInCart.map((it) => it.productDetailId);
      const res = getVoucherApplyProductApi(ids, totalPriece);
      console.log("res", res);

    } catch (error) {
      console.log(error);

    }
  }

  const totalPriece = listItemCart.itemInCart.reduce((accumulator, object) => {
    if (object.choose) {
      return accumulator + object.stockQuantity;
    }
    return accumulator
  }, 0);


  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      <View style={styles.styleCheckAll}>
        <View style={styles.styleCheckBox}>
          <TouchableOpacity onPress={handleCheckAll}>
            {checkedAll ? <ICISCheckbox /> : <ICNOCheckbox />}
          </TouchableOpacity>
        </View>
        <View style={styles.styleContent}>
          <TextCustom
            fontSize={16}
            weight="400"
            color={defaultColors.text_313131}>
            {t('common.total-product', {
              lenght: listItemCart.itemInCart.length,
            })}
          </TextCustom>
        </View>
        <View style={styles.styleRemove}>
          <ICRemove />
        </View>
      </View>
      <ScrollView>
        <View style={styles.cartContainer}>
          {(listItemCart.itemInCart ?? []).map((it, idx) => {
            return (
              <CartItem
                key={it.productDetailId}
                product={it}
                handleCheckbox={handleCheckbox}
                handleUpdateQuantitySelected={handleUpdateQuantitySelected}
              />
            );
          })}
        </View>
        <View style={styles.promotionalCodeConatiner}>
          <View style={styles.promoItem}>
            <>
              <TextTranslate fontSize={16} weight='400' color={defaultColors.text_313131} text='cart.remind-voucher' />
              <View style={styles.styleGroupPromo}>
                <TextInput
                  style={styles.inputText}
                  placeholder={t('cart.planhoder-voucher')}
                />
                <ButtonGradient onPress={() => { }} style={{}} text='cart.button-apply' />
              </View>
            </>
            <View>

            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.styleBuyNow}>
        <View style={styles.buyNowItem}>
          <View style={styles.styleShowContentBuyNow}>
            <TextTranslate fontSize={16} weight='400' color={defaultColors.text_303030} text='' />
            <TextCustom fontSize={16} weight='400' color={defaultColors.text_303030}>{formatNumberDotWithO(4000000)}</TextCustom>
          </View>
          <View style={styles.styleShowContentBuyNow}>
            <TextTranslate fontSize={16} weight='400' color={defaultColors.text_303030} text='' />
            <TextCustom fontSize={16} weight='400' color={defaultColors.primary}>-{formatNumberDotWithO(30000)}</TextCustom>
          </View>
        </View>
        <View style={styles.styleGroupButtonBuyNow}>
          <View style={styles.styleShowContentBuyNow}>
            <TextTranslate fontSize={16} weight='400' color={defaultColors.text_303030} text='' />
            <TextCustom fontSize={16} weight='700' color={defaultColors.text_111213}>-{formatNumberDotWithO(70000)}</TextCustom>
          </View>
          <ButtonGradient
            onPress={() => { }}
            text={t('common.buy_now')}
            renderLeff={<ICBuyNow />}
            style={{ columnGap: 4 }}
          />
        </View>
      </View>
    </View>
  );
};

export default CartsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 16,
    flexDirection: 'column',
    rowGap: 12,
  },
  styleCheckAll: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 17,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  styleCheckBox: {
    width: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
  },
  styleRemove: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    // height: '100%',
    // width: '100%',
  },
  cartContainer: {
    flexDirection: 'column',
    rowGap: 12,
  },
  promotionalCodeConatiner: {
    paddingTop: 15,
    paddingHorizontal: 17,
    borderRadius: 20,
    backgroundColor: defaultColors.c_fff,
    with: '100%',
    height: 'auto'
  },
  promoItem: {
    flexDirection: 'column',
    rowGap: 20,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20
  },
  styleGroupPromo: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 8,
  },
  inputText: {
    flex: 1,
    height: 94,
    paddingLeft: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: defaultColors.bg_939393,
    borderWidth: 1
  },
  styleBuyNow: {
    position: 'absolute',
    bottom: BOTTOM_BAR_HEIGHT,
    left: 0,
    height: 90,
    zIndex: 9999,
    backgroundColor: defaultColors.c_fff,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_00C3AB,
    marginHorizontal: 12
  },
  buyNowItem: {
    flexDirection: 'column',
    rowGap: 3,
    borderBottomColor: defaultColors.br_D9D9D9,
    borderBottomWidth: 1
  },
  styleShowContentBuyNow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  styleGroupButtonBuyNow: {
    flexDirection: 'column',
    rowGap: 11,
    paddingTop: 11
  }
});

const data = [
  {
    actualPriceDetail: 26730,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    attributesKr: [[Object]],
    choose: false,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/169770341777824380422-ac81-433f-a1ce-d9789e42cc3f.webp',
    priceDetail: 27000,
    productDetailId: 21688,
    productDetailNameKr: '차가운 주스 ade 과일 맛 230ml 한국 - 진정한 수입품',
    productDetailNameVn:
      'Nước Trái Cây Lạnh Ade các vị hoa quả 230ml Hàn Quốc - hàng nhập khẩu chính hãng',
    productId: 21680,
    promoDetail: 1,
    quantitySelected: 2,
    soldQuantity: 0,
    stockQuantity: 272,
  },
  {
    actualPriceDetail: 26730,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    attributesKr: [[Object]],
    choose: false,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/1697703417709ca974675-ba46-40fe-afe6-c0735936434c.webp',
    priceDetail: 27000,
    productDetailId: 21690,
    productDetailNameKr: '차가운 주스 ade 과일 맛 230ml 한국 - 진정한 수입품',
    productDetailNameVn:
      'Nước Trái Cây Lạnh Ade các vị hoa quả 230ml Hàn Quốc - hàng nhập khẩu chính hãng',
    productId: 21680,
    promoDetail: 1,
    quantitySelected: 2,
    soldQuantity: 0,
    stockQuantity: 272,
  },
  {
    actualPriceDetail: 26730,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    attributesKr: [[Object]],
    choose: true,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/16977034176412905548a-1320-4b28-af45-7c5bf77f4b94.webp',
    priceDetail: 27000,
    productDetailId: 21686,
    productDetailNameKr: '차가운 주스 ade 과일 맛 230ml 한국 - 진정한 수입품',
    productDetailNameVn:
      'Nước Trái Cây Lạnh Ade các vị hoa quả 230ml Hàn Quốc - hàng nhập khẩu chính hãng',
    productId: 21680,
    promoDetail: 1,
    quantitySelected: 1,
    soldQuantity: 0,
    stockQuantity: 272,
  },
  {
    actualPriceDetail: 25740,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    attributesKr: [[Object]],
    choose: false,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/1697703615511277e33b9-bd72-442f-b29c-d0354b9aff71.webp',
    priceDetail: 26000,
    productDetailId: 21698,
    productDetailNameKr: '얼음 토크 수박, 녹색 포도, 한국 레몬 190ml- 수입품',
    productDetailNameVn:
      'Nước Ice Talk Các Vị Dưa Hấu ,Nho Xanh, Chanh Hàn Quốc 190ml- hàng nhập khẩu chính hãng',
    productId: 21695,
    promoDetail: 1,
    quantitySelected: 1,
    soldQuantity: 1,
    stockQuantity: 286,
  },
];
