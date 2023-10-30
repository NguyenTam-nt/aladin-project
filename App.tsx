/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/redux';
import Toast from 'react-native-toast-message';
import ToastMessage from 'src/components/Toast';
import { View, StyleSheet, Platform, NativeModules } from 'react-native';
import './src/configs/i18n';
import * as RNLocalize from 'react-native-localize';
import MainStack from 'src/navigations/MainStack';
import Orientation from 'react-native-orientation-locker';
import { languageKey } from 'src/constants/defines';
import { useTranslation } from 'react-i18next';
import {
  useGetLanguage,
  useHandleChangeLanguage,
} from 'src/redux/multilanguage/hooks';

import { ReactNativeKeycloakProvider } from '@react-keycloak/native';
import keycloak from 'src/keycloak';
import { useDispatch } from 'react-redux';
import { useGoBack } from 'src/hooks/useGoBack';
import {
  initUserInfo,
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import { getUserInfo } from 'src/api/user';
import { AuthServices } from 'src/api/authService';
import { ICartItem, getCartItemAPI, updateCartItem } from 'src/api/cartItem';
import {
  useHandleAddArrayItemToCart,
  useListItemCart,
} from 'src/redux/orderCart/hooks';
import { useToken } from 'src/redux/reducers/hook';

function App() {
  const { i18n } = useTranslation();
  const getLanguage = useGetLanguage();
  const dispatch = useDispatch();
  const listItemCart = useListItemCart();
  const { initKeycloak } = AuthServices();
  const handleAddArrayItemToCart = useHandleAddArrayItemToCart();
  const { authenticated } = AuthServices();
  const token = useToken();
  const toastConfig = {
    tomatoToast: ({ props }: any) => (
      <ToastMessage status={props.status} title={props.uuid} />
    ),
  };
  const defaultLanguage = languageKey.vi;

  const getDeviceLanguage = (locale?: string) => {
    const deviceLanguage: string =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : locale || NativeModules.I18nManager.localeIdentifier;

    if (typeof deviceLanguage !== 'string') {
      return defaultLanguage;
    }
    if (deviceLanguage.includes(languageKey.vi)) {
      return languageKey.vi;
    }
    if (deviceLanguage.includes(languageKey.ko)) {
      return languageKey.ko;
    }

    return defaultLanguage;
  };
  // const handleUpdateCartItem = async (token: string, data: ICartItem[]) => {
  //   try {
  //     const res = await updateCartItem(token, data);
  //     console.log('updateupdate', res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleGetCartItemApi = async (token: string) => {
    try {
      const res = await getCartItemAPI(token);
      if (res) {
        handleAddArrayItemToCart(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const langusge = getLanguage.currenLanguage;
    // Orientation.lockToPortrait();
    if (langusge) {
      i18n.changeLanguage(langusge);
      return;
    } else {
      const locale2 = getDeviceLanguage(
        RNLocalize.getLocales()[0].languageCode,
      );
      i18n.changeLanguage(locale2);
      return;
    }
  }, [getLanguage]);
  useEffect(() => {
    if (token) {
      handleGetCartItemApi(token);
    }
  }, [token]);

  const onKeycloakTokens = useCallback(async (tokens: { token: any }) => {
    if (!tokens.token) {
      // remove from storage
      // dispatch(setToken(''));
      // dispatch(setRefreshToken(''));
      // dispatch(setUserInfo(initUserInfo));
    } else {
      await dispatch(setToken(tokens.token));
      //@ts-ignore
      await dispatch(setRefreshToken(tokens?.refreshToken));
      const userInfo = await getUserInfo(tokens.token);
      // console.log('userinfo', userInfo);

      if (userInfo) {
        await dispatch(setUserInfo(userInfo.data));
      }
      // if (listItemCart.itemInCart.length > 0) {
      //   await handleUpdateCartItem(tokens.token, listItemCart.itemInCart);
      // }
      //save to storage tokens.token
    }
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <ReactNativeKeycloakProvider
        authClient={keycloak}
        initOptions={initKeycloak}
        onEvent={(event, error) => {
          console.log('Keycloak event :', event, error);
        }}
        isLoadingCheck={keycloak => {
          console.log('Authenticated', keycloak.authenticated);
          console.log('token', keycloak.token);

          return !keycloak.authenticated;
        }}
        autoRefreshToken={true}
        //@ts-ignore
        onTokens={tokens => onKeycloakTokens(tokens)}
      // onTokens={onKeycloakTokens
      >
        <SafeAreaProvider>
          <MainStack />
          <Toast
            config={toastConfig}
            position="top"
            visibilityTime={1500}
          // bottomOffset={20}
          />
        </SafeAreaProvider>
      </ReactNativeKeycloakProvider>
    </PersistGate>
  );
}

const styles = StyleSheet.create({});
export default App;
