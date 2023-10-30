import {TextCustom, Thumb} from '@components';
import {BOTTOM_BAR_HEIGHT, defaultColors} from '@configs';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {ICISCheckbox} from 'src/assets/icons/ICISCheckbox';
import {ICRemove} from 'src/assets/icons/ICRemove';
import HeaderBack from 'src/components/Header/HeaderBack';
import {
  useHandleAddVoucherApply,
  useHandleProductOrder,
  useHandleSetChoose,
  useHandleSetChooseAll,
  useHandleUpdateQuantitySelectedInCart,
  useListItemCart,
} from 'src/redux/orderCart/hooks';
import CartItem from './components/CartItem';
import {ICNOCheckbox} from 'src/assets/icons/ICNOCheckox';
import TextTranslate from 'src/components/TextTranslate';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {IVoucher, getVoucherApplyProductApi} from 'src/api/voucher';
import {formatNumberDotWithO} from 'src/commons/formatMoney';
import {ICBuyNow} from 'src/assets/icons/ICBuyNow';
import {useDispatch} from 'react-redux';
import {
  addVoucherApply,
  removeCartList,
  removeItemById,
} from 'src/redux/orderCart/slice';
import {globalStyles} from 'src/commons/globalStyles';
import useI18n from 'src/hooks/useI18n';
import Toast from 'react-native-toast-message';
import {VoucherType} from 'src/typeRules/voucher';
import {IProductOrder} from 'src/api/order';
import {useNavigation} from '@react-navigation/native';
import {productRoute} from 'src/constants/routers';

const CartsScreen = () => {
  const {isVn} = useI18n();
  const navifation = useNavigation();
  const listItemCart = useListItemCart();
  const handleSetChooseAll = useHandleSetChooseAll();
  const handleSetChoose = useHandleSetChoose();
  const handleUpdateQuantity = useHandleUpdateQuantitySelectedInCart();
  const handleAddVoucher = useHandleAddVoucherApply();
  const handleAddProductOrder = useHandleProductOrder();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [chooseVoucher, setChooseVoucher] = useState<IVoucher | null>();
  const [moneyByVoucher, setMeneyByVoucher] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState<string>('');
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
      const ids = listItemCart.itemInCart.map(it => it.productDetailId);
      const res = await getVoucherApplyProductApi(ids, totalPriece);
      if (res) {
        setVouchers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalPriece = listItemCart.itemInCart.reduce((accumulator, object) => {
    if (object.choose) {
      return accumulator + object.actualPriceDetail * object.quantitySelected;
    }
    return accumulator;
  }, 0);
  const removeItem = useCallback((id: number) => {
    dispatch(removeItemById(id));
  }, []);

  const removeListItem = useCallback(() => {
    dispatch(removeCartList());
  }, []);

  const handleApplyVoucher = () => {
    if (voucherCode) {
      const index =
        vouchers && vouchers.findIndex(it => it.voucherCode === voucherCode);
      if (index >= 0) {
        const data = vouchers?.[index];
        handleSelectedVoucher(data);
      } else {
        Toast.show({
          type: 'tomatoToast',
          props: {
            status: 'warning',
            uuid: 'messages.warning.voucher-code-incorrect',
          },
        });
        return;
      }
    } else {
      Toast.show({
        type: 'tomatoToast',
        props: {
          status: 'warning',
          uuid: 'messages.warning.voucher-code-null',
        },
      });
      return;
    }
  };
  const handleSelectedVoucher = (voucher: IVoucher) => {
    if (voucher?.id === chooseVoucher?.id) {
      setMeneyByVoucher(0);
      setChooseVoucher(null);
      setVoucherCode('');
      return;
    } else {
      if (voucher.total <= 0) {
        Toast.show({});
        return;
      }
      setChooseVoucher(voucher);
      setVoucherCode(voucher?.voucherCode);
      if (totalPriece >= voucher.minBill) {
        if (voucher.typeVoucher === VoucherType.money) {
          const priece =
            voucher.maxValue > 0
              ? voucher.value <= voucher.maxValue
                ? voucher.value
                : voucher.maxValue
              : voucher.value;

          setMeneyByVoucher(priece);
          return;
        } else if (voucher.typeVoucher === VoucherType.percent) {
          const priceVoucher = totalPriece * (voucher.value / 100);
          const priece =
            voucher.maxValue > 0
              ? priceVoucher <= voucher.maxValue
                ? priceVoucher
                : voucher.maxValue
              : priceVoucher;

          setMeneyByVoucher(priece);
          return;
        }
      } else {
        setMeneyByVoucher(0);
      }
    }
  };

  const handleUsingVoucehr = () => {
    const dataObj = {
      totalPrice: totalPriece,
      voucherCode: chooseVoucher ? chooseVoucher.voucherCode : '',
      voucherPrice: moneyByVoucher,
    };

    handleAddVoucher(dataObj);
  };

  const handleProductOrder = () => {
    let data: any[] = [];
    listItemCart.itemInCart.filter(it => {
      if (it.choose) {
        data.push({
          productNameVn: it.productDetailNameVn,
          productNameKr: it.productDetailNameKr,
          productDetailId: it.productDetailId,
          quantityOder: it.quantitySelected,
          actualPrice: it.actualPriceDetail,
          price: it.priceDetail,
          addressWarehouse: it.addressWarehouse,
          image: it.imageDetailUrl,
        });
      }
    });

    if (data.length > 0) {
      handleAddProductOrder(data);
      handleUsingVoucehr();
      // @ts-ignore
      navifation.navigate(`${productRoute.payment}`);
    } else {
      Toast.show({
        type: 'tomatoToast',
        props: {
          status: 'warning',
          uuid: 'messages.warning.cart-choose-false',
        },
      });
      return;
    }
  };

  const handleBuyNow = () => {
    if (listItemCart.itemInCart.length > 0) {
      handleProductOrder();
      //@ts-ignore
      // navifation.navigate(`${productRoute.payment}`);
    } else {
      Toast.show({
        type: 'tomatoToast',
        props: {
          status: 'warning',
          uuid: 'messages.warning.cart-empty',
        },
      });
      return;
    }
  };

  useEffect(() => {
    if (listItemCart.itemCartOrder) {
      handleVoucherApply();
    }
  }, [listItemCart.itemInCart]);

  console.log('listItemCartl', listItemCart.itemInCart);

  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      <View style={{paddingHorizontal: 16}}>
        {listItemCart.itemInCart.length > 0 && (
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
            <TouchableOpacity
              disabled={!listItemCart.itemInCart.length}
              onPress={removeListItem}>
              <View style={styles.styleRemove}>
                <ICRemove />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView style={{paddingHorizontal: 16}}>
        <View style={styles.cartContainer}>
          {listItemCart.itemInCart.length > 0 ? (
            (listItemCart.itemInCart ?? []).map((it, idx) => {
              return (
                // <></>
                <CartItem
                  key={it.productDetailId}
                  product={it}
                  handleCheckbox={handleCheckbox}
                  handleUpdateQuantitySelected={handleUpdateQuantitySelected}
                  removeItem={removeItem}
                />
              );
            })
          ) : (
            <Thumb
              style={styles.imageCartEmpty}
              source={require('../../assets/image/empty_cart.png')}
              resizeMode="cover"
            />
          )}
        </View>
        {listItemCart.itemInCart.length > 0 && (
          <View style={styles.promotionalCodeConatiner}>
            <View style={styles.promoItem}>
              <View
                style={{
                  backgroundColor: defaultColors.bg_DAF1E7,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    flexDirection: 'column',
                    rowGap: 5,
                  }}>
                  <TextTranslate
                    fontSize={16}
                    weight="400"
                    color={defaultColors.text_313131}
                    text="cart.remind-voucher"
                  />
                  <View style={styles.styleGroupPromo}>
                    <TextInput
                      style={styles.inputText}
                      onChangeText={setVoucherCode}
                      value={voucherCode}
                      placeholder={t('cart.planhoder-voucher')}
                    />
                    <View style={{width: '33%'}}>
                      <ButtonGradient
                        onPress={handleApplyVoucher}
                        text={t('cart.button-apply')}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.styleVoucher}>
                {vouchers?.length > 0 &&
                  vouchers.map((it, idx) => {
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => handleSelectedVoucher(it)}
                        style={[
                          styles.styleVoucherItem,
                          chooseVoucher?.id === it.id && {
                            backgroundColor: defaultColors.bg_DAF1E7,
                          },
                        ]}>
                        <TextCustom
                          fontSize={14}
                          weight="400"
                          color={defaultColors.c_0000}>
                          {it.voucherName}
                        </TextCustom>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          </View>
        )}

        {/* <SpaceBottom /> */}
        <View style={{paddingBottom: 155}} />
      </ScrollView>
      {listItemCart.itemInCart.length > 0 && (
        <View style={styles.styleBuyNow}>
          <View style={{paddingHorizontal: 12, paddingTop: 10}}>
            <View style={styles.buyNowItem}>
              <View style={styles.styleShowContentBuyNow}>
                <TextTranslate
                  fontSize={16}
                  weight="400"
                  color={defaultColors.text_303030}
                  text="cart.product-value"
                />
                <TextCustom
                  fontSize={16}
                  weight="400"
                  color={defaultColors.text_303030}>
                  {formatNumberDotWithO(totalPriece)}
                </TextCustom>
              </View>
              <View style={styles.styleShowContentBuyNow}>
                <TextTranslate
                  fontSize={16}
                  weight="400"
                  color={defaultColors.text_303030}
                  text="cart.promo"
                />
                <TextCustom
                  fontSize={16}
                  weight="400"
                  color={defaultColors.primary}>
                  -{formatNumberDotWithO(moneyByVoucher)}
                </TextCustom>
              </View>
            </View>
            <View style={styles.styleGroupButtonBuyNow}>
              <View style={styles.styleShowContentBuyNow}>
                <TextTranslate
                  fontSize={16}
                  weight="400"
                  color={defaultColors.text_303030}
                  text="cart.total-priece"
                />
                <TextCustom
                  fontSize={16}
                  weight="700"
                  color={defaultColors.text_111213}>
                  {formatNumberDotWithO(totalPriece - moneyByVoucher)}
                </TextCustom>
              </View>
              <ButtonGradient
                onPress={handleBuyNow}
                text={t('common.buy_now')}
                renderLeff={<ICBuyNow />}
                style={{columnGap: 4}}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
    // paddingHorizontal: 16,
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
    marginTop: 15,
    paddingHorizontal: 17,
    borderRadius: 20,
    backgroundColor: defaultColors.c_fff,
    with: '100%',
    height: 'auto',
  },
  promoItem: {
    flexDirection: 'column',
    rowGap: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  styleGroupPromo: {
    flexDirection: 'row',
    columnGap: 8,
  },
  inputText: {
    flex: 1,
    width: '100%',
    height: 40,
    paddingLeft: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: defaultColors.bg_939393,
    borderWidth: 1,
  },
  styleBuyNow: {
    position: 'absolute',
    // bottom: BOTTOM_BAR_HEIGHT,
    bottom: 0,
    left: 0,
    height: 155,
    zIndex: 9999,
    backgroundColor: defaultColors.c_fff,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_00C3AB,
    // marginHorizontal: 12,
  },
  buyNowItem: {
    flexDirection: 'column',
    rowGap: 3,
    borderBottomColor: defaultColors.br_D9D9D9,
    borderBottomWidth: 1,
  },
  styleShowContentBuyNow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleGroupButtonBuyNow: {
    flexDirection: 'column',
    rowGap: 11,
    paddingTop: 11,
  },
  imageCartEmpty: {
    width: '100%',
    height: 230,
  },
  styleVoucher: {
    ...globalStyles.flexWrap,
    flexDirection: 'row',
    gap: 8,
    // marginTop: 20,
  },
  styleVoucherItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 100,
    borderColor: defaultColors.bg_00C3AB,
    borderWidth: 1,
  },
});

const data = [
  {
    actualPrice: 382500,
    addressWarehouse: 'Thành phố Hà Nội',
    image: '',
    price: 450000,
    productDetailId: 21816,
    productNameKr: '사양라면 한국 인스턴트 국수',
    productNameVn: 'Mỳ ăn liền Samyang Ramen Hàn Quốc ',
    quantityOder: 2,
  },
  {
    actualPrice: 24300,
    addressWarehouse: 'Thành phố Hà Nội',
    image:
      'https://marketmoa.com.vn/getimage/16977058336150842c465-7416-42c3-87f5-d1efeee8d027.webp',
    price: 27000,
    productDetailId: 22146,
    productNameKr: '한국의 구운 쌀수 비락식혜 238ml- 진정한 수입품',
    productNameVn:
      'Nước Gạo Rang PALDO HÀN QUỐC 비락식혜 238ML - HÀNG NHẬP KHẨU CHÍNH HÃNG',
    quantityOder: 3,
  },
  {
    actualPriceDetail: 299200,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    choose: true,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/16977676722022ff4847a-d024-4c79-b02c-99996ac71c76.webp',
    priceDetail: 340000,
    productDetailId: 22302,
    productDetailNameKr: '요리 레이어의 편리한 비 스틱 냄비',
    productDetailNameVn: 'Nồi chống dính dày lớp nấu ăn tiện lợi',
    productId: 22294,
    promoDetail: 12,
    quantitySelected: 5,
    soldQuantity: 0,
    stockQuantity: 12,
  },
  {
    actualPriceDetail: 24300,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    choose: false,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/1697705833691288368bf-f17c-4c8a-ac54-a08e885c3dee.webp',
    priceDetail: 27000,
    productDetailId: 22144,
    productDetailNameKr: '한국의 구운 쌀수 비락식혜 238ml- 진정한 수입품',
    productDetailNameVn:
      'Nước Gạo Rang PALDO HÀN QUỐC 비락식혜 238ML - HÀNG NHẬP KHẨU CHÍNH HÃNG',
    productId: 21863,
    promoDetail: 10,
    quantitySelected: 8,
    soldQuantity: 0,
    stockQuantity: 100,
  },
  {
    actualPriceDetail: 299200,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    choose: true,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/1697767672035caa3f98d-8508-45b4-a668-e3b1317291c6.webp',
    priceDetail: 340000,
    productDetailId: 22300,
    productDetailNameKr: '요리 레이어의 편리한 비 스틱 냄비',
    productDetailNameVn: 'Nồi chống dính dày lớp nấu ăn tiện lợi',
    productId: 22294,
    promoDetail: 12,
    quantitySelected: 4,
    soldQuantity: 0,
    stockQuantity: 12,
  },
  {
    actualPriceDetail: 185000,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    choose: true,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/16977682239109b2184ba-ef9f-4d43-a8b3-7f035868120c.webp',
    priceDetail: 185000,
    productDetailId: 22311,
    productDetailNameKr:
      '고품질 석조 석재 증기 스팀 스테인레스 스틸 프라이드 식품 가공을 가진 멀티 28cm 다중 기능 전기 핫팟',
    productDetailNameVn:
      'Nồi Lẩu Điện Đa Năng Melli 28cm Chống Dính Vân Đá Cao Cấp Kèm Giá Hấp Inox Chiên Xào Chế Biến Đồ Ăn',
    productId: 22307,
    promoDetail: 0,
    quantitySelected: 2,
    soldQuantity: 0,
    stockQuantity: 100,
  },
  {
    actualPriceDetail: 129000,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    choose: true,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/1697766644123fd81e2eb-c19d-4add-8fa7-8df5ed8747f9.webp',
    priceDetail: 129000,
    productDetailId: 22276,
    productDetailNameKr:
      '304 스테인레스 스틸 비 스틱 팬 28cm 깊이, 긁힌 단열재 - 모든 유형의 주방에 사용 - 매우 저렴',
    productDetailNameVn:
      'Chảo Chống Dính Inox 304 Sâu Lòng 28cm, Chống Xước Quai Cầm Cách Nhiệt - Dùng Cho Mọi Loại Bếp - Siêu Rẻ',
    productId: 22272,
    promoDetail: 0,
    quantitySelected: 2,
    soldQuantity: 0,
    stockQuantity: 100,
  },
  {
    actualPriceDetail: 382500,
    addressWarehouse: 'Tỉnh Lai Châu',
    attributes: [[Object]],
    choose: true,
    imageDetailUrl: null,
    priceDetail: 450000,
    productDetailId: 21834,
    productDetailNameKr: '사양라면 한국 인스턴트 국수',
    productDetailNameVn: 'Mỳ ăn liền Samyang Ramen Hàn Quốc ',
    productId: 21812,
    promoDetail: 15,
    quantitySelected: 2,
    soldQuantity: 0,
    stockQuantity: 2,
  },
];
