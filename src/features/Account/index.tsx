import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import {useKeycloak} from '@react-keycloak/native';
import {useNavigation} from '@react-navigation/native';
import React, {ReactElement, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthServices} from 'src/api/authService';
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
import {
  useGetLanguage,
  useHandleChangeLanguage,
} from 'src/redux/multilanguage/hooks';
import {
  initUserInfo,
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import {useUserInfo} from 'src/redux/reducers/hook';
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
  const {dologout} = AuthServices();
  const getLanguage = useGetLanguage();
  const {toggleDropdown, visible, setVisible, dropdownTop, refDropdown} =
    useDropdown();
  const {i18n} = useTranslation();
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
          <ICAccountInfo />
          {userInfo.login ? (
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
          ) : (
            <TextTranslate
              fontSize={18}
              weight="400"
              lineHeight={27}
              color={defaultColors.c_0000}
              text="account.manage-account-info"
            />
          )}
        </View>
        <View style={styles.actionItemStyle}>
          <ICPassword width={19} height={23} />
          {userInfo.login ? (
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
          ) : (
            <TextTranslate
              fontSize={18}
              weight="400"
              lineHeight={27}
              color={defaultColors.c_0000}
              text="account.change-pass"
            />
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
