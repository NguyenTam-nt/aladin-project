import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import {useKeycloak} from '@react-keycloak/native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {ReactElement, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthServices} from 'src/api/authService';
import {getCartItemAPI} from 'src/api/cartItem';
import {ICAccountInfo} from 'src/assets/icons/ICAccountInfo';
import {ICDropdown} from 'src/assets/icons/ICDropdown';
import {ICPassword} from 'src/assets/icons/ICPassword';
import {ICAccount} from 'src/assets/icons/bottomtab/ICAccount';
import {VietnamFlag, koreanFlag} from 'src/assets/image';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import {Header} from 'src/components/Header';
import TextTranslate from 'src/components/TextTranslate';
import {accountRoute} from 'src/constants/routers';
import {useDropdown} from 'src/hooks/useDropdown';
import {useGoBack} from 'src/hooks/useGoBack';
import {
  useGetLanguage,
  useHandleChangeLanguage,
} from 'src/redux/multilanguage/hooks';
import {useHandleAddArrayItemToCart} from 'src/redux/orderCart/hooks';
import {
  initUserInfo,
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import {useToken, useUserInfo} from 'src/redux/reducers/hook';
export type LANGUAGE_KEY = 'vi' | 'ko';
const LANGUAGE: {key: LANGUAGE_KEY; image: any}[] = [
  {
    key: 'vi',
    image: VietnamFlag,
  },
  {
    key: 'ko',
    image: koreanFlag,
  },
];
const AccountScreen = () => {
  const navigation = useNavigation();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const useChangeLanguage = useHandleChangeLanguage();
  const {dologout, authenticated} = AuthServices();
  const dismiss = useGoBack();
  const token = useToken();
  const {toggleDropdown, visible, setVisible, dropdownTop, refDropdown} =
    useDropdown();
  const {i18n} = useTranslation();
  const handleAddArrayItemToCart = useHandleAddArrayItemToCart();
  const [languageAction, setLanguageAction] = useState<{
    key: LANGUAGE_KEY;
    image: any;
  }>(LANGUAGE[0]);

  useEffect(() => {
    const index = LANGUAGE.findIndex(it => {
      return it.key === i18n.language;
    });
    setLanguageAction(index >= 0 ? LANGUAGE[index] : LANGUAGE[0]);
  }, [i18n]);

  const handleChangeLanguage = (value: LANGUAGE_KEY) => {
    i18n.changeLanguage(value);
    //@ts-ignore
    useChangeLanguage(value);
  };

  const handleLoout = () => {
    dologout();
    dispatch(setToken(''));
    dispatch(setRefreshToken(''));
    dispatch(setUserInfo(initUserInfo));
    //@ts-ignore
    navigation.navigate(accountRoute.login);
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop + 20}]}>
            {LANGUAGE.map((it, idx) => {
              if (languageAction.key !== it.key) {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      handleChangeLanguage(it.key);
                      setLanguageAction(it);
                      setVisible(false);
                    }}>
                    <Thumb
                      source={it.image}
                      resizeMode="cover"
                      style={{width: 37, height: 26}}
                    />
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Header children={undefined} />
      <View style={styles.viewInfo}>
        <ICAccount width={84} height={84} />
        <TextCustom
          fontSize={18}
          weight="700"
          color={defaultColors.text_313131}>
          {userInfo.fullName ?? userInfo.email}
        </TextCustom>
        {userInfo.login ? (
          <ButtonTouchable
            onPress={handleLoout}
            height={40}
            borderRadius={30}
            text="account.logout"
            isAction={true}
            style={{
              paddingHorizontal: 50,
              shadowColor: '#171717',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          />
        ) : (
          <ButtonTouchable
            //@ts-ignore
            onPress={() => navigation.navigate(accountRoute.login)}
            height={40}
            borderRadius={30}
            text="account.login"
            isAction={true}
            style={{
              paddingHorizontal: 50,
              shadowColor: '#171717',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          />
        )}
      </View>
      <View style={styles.groupAction}>
        <View style={styles.actionItemStyle}>
          {userInfo.login && <ICAccountInfo />}
          {userInfo.login && (
            <TouchableOpacity
              onPress={() =>
                //@ts-ignore
                navigation.navigate(accountRoute.manageAccountInfo)
              }>
              <TextTranslate
                fontSize={18}
                weight="400"
                lineHeight={27}
                color={defaultColors.c_0000}
                text="account.manage-account-info"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.actionItemStyle}>
          {userInfo.login && <ICPassword width={19} height={23} />}
          {userInfo.login && (
            <TouchableOpacity
              onPress={() =>
                //@ts-ignore
                navigation.navigate(accountRoute.changePass)
              }>
              <TextTranslate
                fontSize={18}
                weight="400"
                lineHeight={27}
                color={defaultColors.c_0000}
                text="account.change-pass"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginTop: 12, ...styles.actionItemStyle}}>
          <Thumb
            source={languageAction?.image}
            resizeMode="cover"
            style={{width: 37, height: 26}}
          />
          <TouchableOpacity
            //@ts-ignore
            ref={refDropdown}
            onPress={toggleDropdown}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {renderDropdown()}
            <ICDropdown />
            <View style={{paddingLeft: 10}}>
              <TextTranslate
                fontSize={18}
                weight="600"
                color={defaultColors.c_0000}
                text="account.language"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  viewInfo: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 20,
    marginTop: 20,
    paddingBottom: 48,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.text_C4C4C4,
  },
  groupAction: {
    flexDirection: 'column',
    rowGap: 12,
    marginTop: 16,
  },
  actionItemStyle: {
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 'auto',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    left: 20,
  },
  overlay: {
    width: 'auto',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

const data = {
  data: [
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
      actualPriceDetail: 382500,
      addressWarehouse: 'Thành phố Hà Nội',
      attributes: [Array],
      choose: true,
      imageDetailUrl: null,
      priceDetail: 450000,
      productDetailId: 21816,
      productDetailNameKr: '사양라면 한국 인스턴트 국수',
      productDetailNameVn: 'Mỳ ăn liền Samyang Ramen Hàn Quốc ',
      productId: 21812,
      promoDetail: 15,
      quantitySelected: 2,
      soldQuantity: 0,
      stockQuantity: 2,
    },
    {
      actualPriceDetail: 40590,
      addressWarehouse: 'Thành phố Hà Nội',
      attributes: [Array],
      choose: true,
      imageDetailUrl: null,
      priceDetail: 41000,
      productDetailId: 22137,
      productDetailNameKr:
        '한국 아이타이 커피와 함께 사용되는 에이스 비스킷 해태 에이스- 진정한 수입품',
      productDetailNameVn:
        'Bánh Quy ACE Dùng Với Cà Phê HAITAI HÀN QUỐC 해태에이스- HÀNG NHẬP KHẨU CHÍNH HÃNG',
      productId: 21741,
      promoDetail: 1,
      quantitySelected: 3,
      soldQuantity: 0,
      stockQuantity: 100,
    },
    {
      actualPriceDetail: 46528.02,
      addressWarehouse: 'Thành phố Hà Nội',
      attributes: [Array],
      choose: true,
      imageDetailUrl:
        'https://marketmoa.com.vn/getimage/16977024231869ea341d6-ce87-4929-83b8-65e58df19c1d.webp',
      priceDetail: 46998,
      productDetailId: 21648,
      productDetailNameKr: '한국 오리온 옥수수 수프 - 정품 수입품',
      productDetailNameVn:
        'Snack Soup Ngô ORION HÀN QUỐC - HÀNG NHẬP KHẨU CHÍNH HÃNG',
      productId: 21643,
      promoDetail: 1,
      quantitySelected: 2,
      soldQuantity: 0,
      stockQuantity: 30,
    },
    {
      actualPriceDetail: 26730,
      addressWarehouse: 'Thành phố Hà Nội',
      attributes: [Array],
      choose: true,
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
      stockQuantity: 2,
    },
  ],
  success: true,
};
