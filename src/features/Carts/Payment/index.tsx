import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import HeaderBack from 'src/components/Header/HeaderBack';
import {defaultColors} from '@configs';
import {TextCustom, Thumb} from '@components';
import {
  formatNumberDotWithO,
  formatNumberDotWithVND,
} from 'src/commons/formatMoney';
import TextTranslate from 'src/components/TextTranslate';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import {ICISChecked} from 'src/assets/icons/ICISChecked';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import {useListItemCart} from 'src/redux/orderCart/hooks';
import * as Yup from 'yup';
import {IProductOrder, craeteOrderApi} from 'src/api/order';
import useI18n from 'src/hooks/useI18n';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useUserInfo} from 'src/redux/reducers/hook';
import {IUserInfo} from 'src/redux/reducers/AuthSlice';
import {useModal} from 'src/hooks/useModal';
import ModalCustom from 'src/components/ModalCustom';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICSuccess} from 'src/assets/icons/ICSuccess';
import {ICError} from 'src/assets/icons/ICError';
import {DIMENSION} from '@constants';
import {accountRoute, productRoute} from 'src/constants/routers';
import {useNavigation} from '@react-navigation/native';
import {ICWarrning} from 'src/assets/icons/ICWarrning';
interface IProps {
  productOrder: IProductOrder;
}
const CartItem = (props: IProps) => {
  const {productOrder} = props;
  const {isVn} = useI18n();
  return (
    <View style={styles.cartItem}>
      <Thumb
        style={styles.styleImage}
        source={{
          uri: productOrder.image,
        }}
        resizeMode="cover"
      />
      <View style={styles.cartItemDetail}>
        <TextCustom
          numberOfLines={3}
          fontSize={14}
          weight="400"
          color={defaultColors.text_313131}>
          {isVn ? productOrder.productNameVn : productOrder.productNameKr}
        </TextCustom>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextCustom fontSize={14} weight="700" color={defaultColors.primary}>
            X{productOrder.quantityOder}
          </TextCustom>
          <TextCustom fontSize={14} weight="700" color={defaultColors.primary}>
            {formatNumberDotWithVND(productOrder.actualPrice)}
          </TextCustom>
        </View>
      </View>
    </View>
  );
};
const PaymentScreen = () => {
  const {t} = useTranslation();
  const listCartItems = useListItemCart();
  const userInfo = useUserInfo();
  const modalEditInventory = useModal();
  const modalEditInventoryLogin = useModal();
  // const [showError, setShowError] = useState<string>('');
  // const [showSuccess, setShowSuccess] = useState<string>('');
  const [messageType, setMessageType] = useState<'SUCCESS' | 'ERROR' | ''>('');
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      note: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required('messages.full-name.requied')
        .max(40, 'messages.max'),
      phoneNumber: Yup.string()
        .trim()
        .required('messages.phone-number.requied')
        .max(10, 'messages.max')
        .matches(/([0-9]{10})\b/g, 'messages.phone-number.matches'),
      address: Yup.string()
        .trim()
        .required('messages.address.requied')
        .max(100, 'messages.max'),
      email: Yup.string()
        .trim()
        .required('messages.email.requied')
        .email('messages.email.matches')
        .max(256, 'messages.max'),
    }),
    onSubmit: async (value: any) => {
      console.log(value);
      const datas = {
        ...value,
        productOrders: listCartItems.itemCartOrder,
        totalPrice: listCartItems.voucherApply?.totalPrice,
        voucherPrice: listCartItems.voucherApply?.voucherPrice,
        voucherCode: listCartItems.voucherApply?.voucherCode,
        paymentType: 'COD',
      };

      handleCheckLogin
        ? //@ts-ignore
          openModalLogin()
        : handleCreateOrder(datas);
      // console.log('datas ', datas);
    },
  });

  //  navigation.navigate(accountRoute.login)
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    handleChange: handleChangeInput,
    handleSubmit,
  } = formik;

  const handleCreateOrder = async (data: any) => {
    try {
      const res = await craeteOrderApi(data);
      console.log('ressss', res);
      if (res.success === true) {
        openModal();
        setMessageType('SUCCESS');
      } else {
        openModal();
        setMessageType('ERROR');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    modalEditInventory.handleShow();
  };
  const openModalLogin = () => {
    modalEditInventoryLogin.handleShow();
  };
  const handleSetData = (data: IUserInfo) => {
    setFieldValue('fullName', data.fullName);
    setFieldValue('phoneNumber', data.phoneNumber);
    setFieldValue('address', data.address);
    setFieldValue('email', data.email);
  };

  useEffect(() => {
    if (userInfo.login) {
      handleSetData(userInfo);
    }
  }, [userInfo]);

  const handleClose = () => {
    modalEditInventory.handleHidden();
  };

  const handleNavigateProduct = () => {
    //@ts-ignore
    navigation.navigate('mains', {
      screen: 'product',
      params: {screen: productRoute.prifex},
    });
  };

  const handleNavigateLogin = () => {
    modalEditInventoryLogin.handleHidden();
    //@ts-ignore
    navigation.navigate(accountRoute.login);
  };
  const handleCheckLogin = useMemo(() => {
    if (!userInfo.login) {
      return true;
    }
    return false;
  }, [userInfo]);
  const handleCloseWithBack = () => {
    modalEditInventory.handleHidden();
    handleNavigateProduct();
  };
  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      {/* <ScrollView style={{paddingHorizontal: 17}}> */}
      <KeyboardAwareScrollView style={{paddingHorizontal: 17}}>
        <View style={styles.listCarts}>
          {(listCartItems.itemCartOrder ?? []).map((it, idx) => {
            return <CartItem key={idx} productOrder={it} />;
          })}
          <View style={styles.prodcutValue}>
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
                {formatNumberDotWithO(listCartItems.voucherApply?.totalPrice)}
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
                -
                {formatNumberDotWithO(listCartItems.voucherApply?.voucherPrice)}
              </TextCustom>
            </View>
          </View>
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
              {formatNumberDotWithO(
                (listCartItems.voucherApply?.totalPrice ?? 0) -
                  (listCartItems.voucherApply?.voucherPrice ?? 0),
              )}
            </TextCustom>
          </View>
        </View>
        <View style={styles.styleform}>
          <View style={styles.styleform}>
            <TextTranslate
              fontSize={18}
              weight="700"
              color={defaultColors.text_000000}
              text="cart.form.title"
            />
            <TextInputComponent
              textTitle="cart.form.full-name"
              textPlanholder="cart.form.planhoder-full-name"
              onChangeText={handleChangeInput('fullName')}
              value={values.fullName}
              keyboardType="number-pad"
              // @ts-ignore
              message={
                touched.fullName && errors.fullName ? errors.fullName : ''
              }
              option={{max: 40}}
              maxLength={40}
            />
            <TextInputComponent
              textTitle="cart.form.phone-number"
              textPlanholder="cart.form.planhoder-phone-number"
              onChangeText={handleChangeInput('phoneNumber')}
              value={values.phoneNumber}
              keyboardType="numeric"
              // @ts-ignore
              message={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : ''
              }
              option={{max: 10}}
              maxLength={10}
              isPhone={true}
            />
            <TextInputComponent
              textTitle="cart.form.email"
              textPlanholder="cart.form.planhoder-email"
              onChangeText={handleChangeInput('email')}
              value={values.email}
              //@ts-ignore
              message={touched.email && errors.email ? errors.email : ''}
              option={{max: 256}}
              maxLength={256}
              isRequire={false}
            />
            <TextInputComponent
              textTitle="cart.form.address"
              textPlanholder="cart.form.planhoder-address"
              onChangeText={handleChangeInput('address')}
              value={values.address}
              // @ts-ignore
              message={touched.address && errors.address ? errors.address : ''}
              option={{max: 100}}
              maxLength={100}
            />
            <TextInputComponent
              textTitle="cart.form.note"
              textPlanholder="cart.form.planhoder-note"
              onChangeText={handleChangeInput('note')}
              value={values.note}
              option={{max: 256}}
              maxLength={256}
              isRequire={false}
            />
            <>
              <TextTranslate
                fontSize={16}
                weight="700"
                textAlign="justify"
                color={defaultColors.c_0000}
                text="cart.form.payments-methods"
              />

              <View style={styles.paymentMethod}>
                <TextTranslate
                  style={{flex: 1}}
                  fontSize={16}
                  weight="400"
                  color={defaultColors.text_313131}
                  text="cart.form.payment-COD"
                />
                <ICISChecked />
              </View>
            </>
            <View style={{marginTop: 20, flexDirection: 'column', rowGap: 12}}>
              <ButtonGradient
                onPress={handleSubmit}
                text={t('cart.button-order')}
                isLoading={isSubmitting}
              />
              <ButtonTouchable
                // @ts-ignore
                onPress={handleNavigateProduct}
                text="button.see-more-product"
                borderRadius={30}
                textColor={defaultColors.bg_E60E00}
                height={38}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}
        onClose={messageType === 'SUCCESS' ? handleCloseWithBack : handleClose}>
        <View style={styles.modalEdit}>
          <TouchableOpacity
            onPress={
              messageType === 'SUCCESS' ? handleCloseWithBack : handleClose
            }
            style={{position: 'absolute', top: 20, right: 20, zIndex: 9999}}>
            <ICClose width={22} height={22} />
          </TouchableOpacity>
          <View style={{marginTop: 2, alignItems: 'center'}}>
            {messageType === 'SUCCESS' && <ICSuccess />}
            {messageType === 'ERROR' && <ICError />}
            <View style={{marginTop: 10}}>
              <TextTranslate
                fontSize={17}
                color={defaultColors.text_111213}
                weight="bold"
                text={
                  messageType === 'SUCCESS'
                    ? 'messages.success.order-cart'
                    : 'messages.error.order-cart'
                }
              />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 10,
              paddingBottom: 15,
              borderBottomWidth: 1,
              borderBottomColor: defaultColors.bg_939393,
            }}>
            <View
              style={{
                flexDirection: 'row',

                columnGap: 2,
                marginTop: 17,
              }}>
              <TextTranslate
                fontSize={14}
                color={defaultColors.text_313131}
                weight="400"
                text={'messages.success.content-order-cart'}
              />
              <TextTranslate
                fontSize={14}
                color={defaultColors.primary}
                weight="bold"
                text="company.name"
              />
            </View>
            {messageType === 'SUCCESS' && (
              <View>
                <TextTranslate
                  fontSize={14}
                  color={defaultColors.text_313131}
                  weight="400"
                  text="messages.success.desc-order-cart"
                />
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 2,
            }}>
            <TextTranslate
              fontSize={14}
              color={defaultColors.text_313131}
              weight="400"
              text="company.support"
            />
            <TextTranslate
              fontSize={14}
              color={defaultColors.primary}
              weight="bold"
              text="1900 55 55 55"
            />
          </View>
          {/* <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: 10,
            }}>
            {}
            {messageType === 'SUCCESS' && <ICSuccess />}
            {messageType === 'ERROR' && <ICError />}
            <TextCustom
              textAlign="center"
              fontSize={17}
              weight="700"
              color={defaultColors.text_313131}>
              {t(
                messageType === 'SUCCESS'
                  ? showSuccess
                  : messageType === 'ERROR'
                  ? showError
                  : '',
              )}
            </TextCustom>
            {messageType === 'SUCCESS' && (
              <ButtonTouchable
                onPress={() => {}}
                style={{
                  backgroundColor: defaultColors._01A63E,
                  height: 40,
                  width: 80,
                }}
                text="common.agree"
              />
            )}
          </View> */}
        </View>
      </ModalCustom>
      <ModalCustom
        onBackdropPress={modalEditInventoryLogin.handleHidden}
        ref={modalEditInventoryLogin.refModal}
        onClose={modalEditInventoryLogin.handleHidden}>
        <View style={styles.modalEditLogin}>
          <TouchableOpacity
            onPress={modalEditInventoryLogin.handleHidden}
            style={{position: 'absolute', top: 20, right: 20, zIndex: 9999}}>
            <ICClose width={22} height={22} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: 10,
            }}>
            <ICWarrning />
            <TextCustom
              textAlign="center"
              fontSize={17}
              weight="700"
              color={defaultColors.text_313131}>
              {t('messages.warning.required-login')}
            </TextCustom>
            <ButtonTouchable
              onPress={handleNavigateLogin}
              style={{
                backgroundColor: defaultColors._01A63E,
                height: 40,
                width: 80,
                marginTop: 15,
              }}
              text="common.agree"
            />
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.bg_EFEFEF,
    paddingBottom: 10,
  },
  carts: {
    paddingTop: 13,
    height: 'auto',
    width: '100%',
    borderRadius: 20,
    backgroundColor: defaultColors.c_fff,
  },
  listCarts: {
    flexDirection: 'column',
    rowGap: 10,
    paddingTop: 14,
    paddingHorizontal: 17,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,
    paddingBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    columnGap: 5,
    justifyContent: 'center',
    // alignItems: 'center',
    height: 80,
  },
  styleImage: {
    borderRadius: 20,
    width: 80,
    height: 80,
  },
  cartItemDetail: {
    flex: 1,
    paddingVertical: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: 4,
    borderLeftColor: defaultColors.br_E9E9E9,
    borderLeftWidth: 1,
  },
  prodcutValue: {
    height: 80,
    flexDirection: 'column',
    rowGap: 4,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_00C3AB,
  },
  styleShowContentBuyNow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  constainerForm: {
    marginVertical: 30,
    borderRadius: 20,
  },
  styleform: {
    paddingHorizontal: 11,
    flexDirection: 'column',
    rowGap: 15,
    marginTop: 20,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,
    paddingBottom: 33,
  },
  paymentMethod: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: defaultColors.text_C4C4C4,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 8,
  },
  modalEdit: {
    position: 'relative',
    height: 'auto',
    width: DIMENSION.width * 0.9,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 10,
    padding: 24,
    marginHorizontal: 20,
    // alignItems: 'center',
  },
  modalEditLogin: {
    position: 'relative',
    height: 200,
    width: DIMENSION.width * 0.9,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 10,
    padding: 24,
    marginHorizontal: 20,
    // alignItems: 'center',
  },
});
