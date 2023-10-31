import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {login} from 'src/api/login';
import {getUserInfo} from 'src/api/user';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICFacebook} from 'src/assets/icons/ICFacebook';
import {ICGoogle} from 'src/assets/icons/ICGoogle';
import {ICLogo} from 'src/assets/icons/ICLogo';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import TextTranslate from 'src/components/TextTranslate';
import {accountRoute} from 'src/constants/routers';
import {useGoBack} from 'src/hooks/useGoBack';
import {
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import * as Yup from 'yup';
import {AuthServices} from 'src/api/authService';
import {useToken, useUserInfo} from 'src/redux/reducers/hook';
import {
  useHandleAddArrayItemToCart,
  useHandleAddItemToCart,
  useListItemCart,
} from 'src/redux/orderCart/hooks';
import {ICartItem, getCartItemAPI, updateCartItem} from 'src/api/cartItem';

const LoginScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const dismiss = useGoBack();
  const navigation = useNavigation();
  const {doLoginGoogle, doLoginFacebook, dologout} = AuthServices();
  const userInfo = useUserInfo();
  const token = useToken();
  const handleAddArrayItemToCart = useHandleAddArrayItemToCart();
  const listItemCart = useListItemCart();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required('messages.username.requied')
        .max(40, 'messages.max'),
      password: Yup.string()
        .trim()
        .required('messages.password.requied')
        .max(40, 'messages.max'),
    }),
    onSubmit: async (value: any) => {
      handleLogin(value.username, value.password);
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange: handleChangeInput,
    handleSubmit,
  } = formik;

  const handleLogin = async (username: string, pass: string) => {
    try {
      const res = await login(username, pass);
      if (res.success) {
        await dispatch(setToken(res.data.access_token));
        await dispatch(setRefreshToken(res.data.refresh_token));
        const userInfo = await getUserInfo(res.data.access_token);
        if (userInfo) {
          await dispatch(setUserInfo(userInfo.data));
          dismiss();
        }
      } else {
        if (res.code === 401) {
          Toast.show({
            type: 'tomatoToast',
            props: {
              status: res.success ? 'success' : 'error',
              uuid: 'messages.error.wrong-user-or-pass',
            },
          });
          //   setTextErrror('messages.error.wrong-user-or-pass');
        } else {
          Toast.show({
            type: 'tomatoToast',
            props: {
              status: res.success ? 'success' : 'error',
              uuid: res?.message,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGGWithKeyclock = () => {
    doLoginGoogle();
  };

  const handleLoginFBWithKeyclock = () => {
    doLoginFacebook();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        dismiss();
        return;
      }
    }, [token]),
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAwareScrollView>
        <Pressable
          onPress={dismiss}
          style={{
            position: 'absolute',
            right: 20,
            top: 50,
            zIndex: 10,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ICClose width={20} height={20} />
        </Pressable>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <ICLogo />
          <View style={{marginTop: 27}}>
            <TextTranslate
              fontSize={20}
              weight="700"
              color={defaultColors.c_0000}
              text="account.login"
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 45}}>
          <View style={{rowGap: 20}}>
            <TextInputComponent
              textTitle="account.form-login.account"
              textPlanholder="account.form-login.planhoder-account"
              value={values.username}
              onChangeText={handleChangeInput('username')}
              //@ts-ignore
              message={
                touched.username && errors.username ? errors.username : ''
              }
              option={{max: 40}}
              maxLength={40}
            />
            <TextInputComponent
              textTitle="account.form-register.pass"
              textPlanholder="account.form-register.planhoder-pass"
              value={values.password}
              onChangeText={handleChangeInput('password')}
              secureTextEntry={true}
              //@ts-ignore
              message={
                touched.password && errors.password ? errors.password : ''
              }
              option={{max: 40}}
              maxLength={40}
            />
          </View>
          <View style={{flexDirection: 'row', columnGap: 5, marginTop: 20}}>
            <TextTranslate
              color={defaultColors.text_264659}
              fontSize={12}
              weight="400"
              text="account.form-login.forgot-pass"
            />
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate(accountRoute.forgotPass)}>
              <TextTranslate
                color={defaultColors.text_018193}
                fontSize={12}
                weight="700"
                text="account.form-login.pass-retrieval"
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', rowGap: 14, marginTop: 18}}>
            <ButtonGradient
              isLoading={isSubmitting}
              onPress={handleSubmit}
              text={t('account.login')}
            />
            <TextTranslate
              textAlign="center"
              color={defaultColors.text_264659}
              fontSize={12}
              weight="400"
              text="account.form-login.login-with"
            />
            <View
              style={{
                flexDirection: 'row',
                columnGap: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={handleLoginGGWithKeyclock}
                style={styles.styleLoginWith}>
                <ICGoogle />
                <TextTranslate
                  textAlign="center"
                  color={defaultColors.text_0C222F}
                  fontSize={14}
                  weight="400"
                  text="account.form-login.google"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLoginFBWithKeyclock}
                style={styles.styleLoginWith}>
                <ICFacebook />
                <TextTranslate
                  textAlign="center"
                  color={defaultColors.text_264659}
                  fontSize={12}
                  weight="400"
                  text="account.form-login.facebook"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 2,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextTranslate
              fontSize={14}
              weight="400"
              color={defaultColors.text_313131}
              text="account.form-login.not-account"
            />
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate(accountRoute.register)}>
              <TextTranslate
                fontSize={14}
                weight="600"
                color={defaultColors._0073E5}
                text="account.form-login.register-now"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Thumb
            style={styles.styleImage}
            source={require('../../assets/image/form_login.png')}
            resizeMode="stretch"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  styleLoginWith: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
    borderRadius: 10,
    borderColor: defaultColors.primary,
    borderWidth: 1,
    paddingVertical: 5,
  },
  styleImage: {
    width: DIMENSION.width,
    height: 288,
  },
});

const data = [
  {
    actualPriceDetail: 299200,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [Array],
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
    attributes: [Array],
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
    attributes: [Array],
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
    attributes: [Array],
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
    attributes: [Array],
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
    attributes: [Array],
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
