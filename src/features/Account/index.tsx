import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import {useNavigation} from '@react-navigation/native';
import React, {ReactElement, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthServices} from 'src/api/authService';
import {getEnableAuthAPI} from 'src/api/enableAuth';
import {clearSession, getUserInfo} from 'src/api/user';
import {ICAccountInfo} from 'src/assets/icons/ICAccountInfo';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICDropdown} from 'src/assets/icons/ICDropdown';
import {ICPassword} from 'src/assets/icons/ICPassword';
import {ICRemoveAccount} from 'src/assets/icons/ICRemoveAccount';
import {ICWarrning} from 'src/assets/icons/ICWarrning';
import {ICAccount} from 'src/assets/icons/bottomtab/ICAccount';
import {VietnamFlag, koreanFlag} from 'src/assets/image';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import {Header} from 'src/components/Header';
import ModalCustom from 'src/components/ModalCustom';
import TextTranslate from 'src/components/TextTranslate';
import {accountRoute} from 'src/constants/routers';
import {useDropdown} from 'src/hooks/useDropdown';
import {useModal} from 'src/hooks/useModal';
import {useEnableAuth} from 'src/redux/enableAuth/hooks';
import {setEnableAuth} from 'src/redux/enableAuth/slice';
import {useHandleChangeLanguage} from 'src/redux/multilanguage/hooks';
import {
  initUserInfo,
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import {useRefreshToken, useToken, useUserInfo} from 'src/redux/reducers/hook';
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
  const {t} = useTranslation();
  const modalEditInventory = useModal();
  const navigation = useNavigation();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const useChangeLanguage = useHandleChangeLanguage();
  const {dologout} = AuthServices();
  const token = useToken();
  const enableAuth = useEnableAuth();
  const refresh_token = useRefreshToken();
  const {toggleDropdown, visible, setVisible, dropdownTop, refDropdown} =
    useDropdown();
  const {i18n} = useTranslation();
  const [languageAction, setLanguageAction] = useState<{
    key: LANGUAGE_KEY;
    image: any;
  }>(LANGUAGE[0]);

  const handleChangeLanguage = (value: LANGUAGE_KEY) => {
    i18n.changeLanguage(value);
    //@ts-ignore
    useChangeLanguage(value);
  };

  const handleGetUserInfo = async (tokens: string) => {
    try {
      const userInfos = await getUserInfo(tokens);
      if (userInfo) {
        dispatch(setUserInfo(userInfos.data));
      }
    } catch (error) {}
  };

  const getEnableAuth = async () => {
    try {
      const res = await getEnableAuthAPI();
      if (res.success === true) {
        dispatch(setEnableAuth(res.data));
      }
    } catch (error) {}
  };

  const handleLoout = () => {
    dologout();
    clearSession(refresh_token);
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

  const hiddenModal = () => {
    modalEditInventory.handleHidden();
  };

  const openModal = () => {
    modalEditInventory.handleShow();
  };

  useEffect(() => {
    getEnableAuth();
    if (token) {
      handleGetUserInfo(token);
    }
  }, [token]);

  useEffect(() => {
    const index = LANGUAGE.findIndex(it => {
      return it.key === i18n.language;
    });
    setLanguageAction(index >= 0 ? LANGUAGE[index] : LANGUAGE[0]);
  }, [i18n]);

  return (
    <View style={styles.container}>
      <Header children={undefined} />
      <View style={styles.viewInfo}>
        <ICAccount width={84} height={84} />
        <TextCustom
          fontSize={18}
          weight="700"
          color={defaultColors.text_313131}>
          {userInfo?.fullName ?? userInfo?.email}
        </TextCustom>
        {userInfo?.login ? (
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
          {userInfo?.login && <ICAccountInfo />}
          {userInfo?.login && (
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
          {userInfo?.login && <ICPassword width={19} height={23} />}
          {userInfo?.login && (
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
        {enableAuth === true && (
          <View style={styles.actionItemStyle}>
            {userInfo?.login && <ICRemoveAccount width={19} height={23} />}
            {userInfo?.login && (
              <TouchableOpacity onPress={openModal}>
                <TextTranslate
                  fontSize={18}
                  weight="400"
                  lineHeight={27}
                  color={defaultColors.c_0000}
                  text="account.remove-account"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
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
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}>
        <View style={styles.modalEdit}>
          <TouchableOpacity
            onPress={hiddenModal}
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
            <TextTranslate
              textAlign="center"
              fontSize={17}
              weight="700"
              color={defaultColors.text_313131}
              text="messages.warning.remove-account"
            />
            <View style={{flex: 1, flexDirection: 'row', columnGap: 10}}>
              <ButtonTouchable
                onPress={hiddenModal}
                text="button.cancel"
                borderRadius={30}
                textColor={defaultColors.bg_E60E00}
                height={38}
                style={{width: '40%'}}
              />
              <View style={{width: '40%'}}>
                <ButtonGradient
                  onPress={() => {
                    handleLoout();
                    hiddenModal();
                  }}
                  text={t('button.agree')}
                />
              </View>
            </View>
          </View>
        </View>
      </ModalCustom>
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
  modalEdit: {
    position: 'relative',
    height: 200,
    width: DIMENSION.width * 0.9,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 10,
    padding: 24,
    marginHorizontal: 20,
  },
});
