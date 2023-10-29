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
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import { getUserInfo } from 'src/api/user';
import { AuthServices } from 'src/api/authService';

function App() {
  const { i18n } = useTranslation();
  const getLanguage = useGetLanguage();
  const dispatch = useDispatch();
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
  // const {t, i18n} = useTranslation();
  // const [currentLanguage, setLanguage] = useState('vi');

  // const changeLanguage = (value: string) => {
  //   i18n
  //     .changeLanguage(value)
  //     .then(() => setLanguage(value))
  //     .catch(err => console.log(err));
  // };

  // React.useEffect(() => {
  //   const locale2 = getDeviceLanguage(
  //     RNLocalize.getLocales()[0].languageCode,
  //   )
  //   // console.log({locale2});
  //   // setLanguage(locale2)
  //   i18n.changeLanguage(locale2);
  //  }, []);

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

  const onKeycloakTokens = useCallback(async (tokens: { token: any }) => {
    if (!tokens.token) {
      // remove from storage
    } else {
      console.log('ReactNativeKeycloakProvider onKeycloakTokens:', tokens);
      await dispatch(setToken(tokens.token));
      //@ts-ignore
      await dispatch(setRefreshToken(tokens?.refreshToken));
      const userInfo = await getUserInfo(tokens.token);
      console.log('userinfo', userInfo);

      if (userInfo) {
        await dispatch(setUserInfo(userInfo.data));
      }
      //save to storage tokens.token
    }
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <ReactNativeKeycloakProvider
        authClient={keycloak}
        initOptions={AuthServices.initKeycloak}
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

const data = {
  idToken:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJQnU2T2h0aHM3b2kxNlhGZ1gzUC1TaFNsc09ETlVLNkV2SEFKNWJxWkdBIn0.eyJleHAiOjE2OTg1MjExNzIsImlhdCI6MTY5ODQ4NTU2NiwiYXV0aF90aW1lIjoxNjk4NDg1MTcyLCJqdGkiOiI3MDZmNDU1ZC1mYzc5LTQ4NjMtOGY4YS02YzY4YmI3ZWE1MWUiLCJpc3MiOiJodHRwczovL21hcmtldG1vYS5jb20udm4vYXV0aC9yZWFsbXMvcGx1c3RtYXJ0IiwiYXVkIjoid2ViX2FwcCIsInN1YiI6IjA0OGJkMWVhLTU3ODktNDlmMC05ZjFjLTQ0YTU2OGYzOWM1YiIsInR5cCI6IklEIiwiYXpwIjoid2ViX2FwcCIsInNlc3Npb25fc3RhdGUiOiI3N2IzZjRlMy1kNDI1LTRlZGUtYjc0NS1iYTQ3MjU5M2EwZmUiLCJhdF9oYXNoIjoiaEljY1cwZzh1X1pzU0l2a3VHUWlFUSIsImFjciI6IjAiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsidXNlcnMiXSwibmFtZSI6IlR14bqlbiBWxakgVsSDbiIsInByZWZlcnJlZF91c2VybmFtZSI6InR1YW52dkBhbGFkaW50ZWNoLmNvIiwiZ2l2ZW5fbmFtZSI6IlR14bqlbiIsImZhbWlseV9uYW1lIjoiVsWpIFbEg24iLCJlbWFpbCI6InR1YW52dkBhbGFkaW50ZWNoLmNvIn0.WwjmCLd8yk7B_pWooSIBevKS993aeTEm3MCKE5CRLf4uVJDyC36CeKd-cNTCCSjJy86k_L-JCcUBNzM3L_GTDdDZr-0LtN6cCk36rGBQzIL6ZYUqVtw4F6HcQx-e5TxZBF3cVZCxo9HrCMn3Q11Ed6u9IdCW8zEoMjTD-nZcvL4fXoA_hljQKQKZqeTxv8g_Gy12EgormqERXmBseq5G0Jfwws1Tb1M3APInRWmtAgZgjkOIinT-sT0uPYy5zTuy5qOr1cU4T5hX4cjrq8iBVcDf0Ce1H7mYKoW84GuDFF5rhS93sfS3bIZdbAC_o0kK1MBCqc2T3iqcLjCIFZhtOg',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwMzVhZWMxMi05Nzk0LTQyZWUtOGJmNy0yNDgzNjc0MjAwMzcifQ.eyJleHAiOjE2OTg1MjExNzIsImlhdCI6MTY5ODQ4NTU2NiwianRpIjoiMWJhOWI0ZTEtMjM5ZS00MjQ2LWJkYjAtZmNlYTFhOWVmZTllIiwiaXNzIjoiaHR0cHM6Ly9tYXJrZXRtb2EuY29tLnZuL2F1dGgvcmVhbG1zL3BsdXN0bWFydCIsImF1ZCI6Imh0dHBzOi8vbWFya2V0bW9hLmNvbS52bi9hdXRoL3JlYWxtcy9wbHVzdG1hcnQiLCJzdWIiOiIwNDhiZDFlYS01Nzg5LTQ5ZjAtOWYxYy00NGE1NjhmMzljNWIiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoid2ViX2FwcCIsInNlc3Npb25fc3RhdGUiOiI3N2IzZjRlMy1kNDI1LTRlZGUtYjc0NS1iYTQ3MjU5M2EwZmUiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.XmeRPZotmT1uPepgE3t3OJPpPa5NIButulVqztnUBPk',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJQnU2T2h0aHM3b2kxNlhGZ1gzUC1TaFNsc09ETlVLNkV2SEFKNWJxWkdBIn0.eyJleHAiOjE2OTg1MjExNzIsImlhdCI6MTY5ODQ4NTU2NiwiYXV0aF90aW1lIjoxNjk4NDg1MTcyLCJqdGkiOiIyOTJkOTFlYy1lNjc3LTQzNTItYmRiOS1mYWEwMDJhZDk3ZjIiLCJpc3MiOiJodHRwczovL21hcmtldG1vYS5jb20udm4vYXV0aC9yZWFsbXMvcGx1c3RtYXJ0IiwiYXVkIjpbImJyb2tlciIsImFjY291bnQiXSwic3ViIjoiMDQ4YmQxZWEtNTc4OS00OWYwLTlmMWMtNDRhNTY4ZjM5YzViIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2ViX2FwcCIsInNlc3Npb25fc3RhdGUiOiI3N2IzZjRlMy1kNDI1LTRlZGUtYjc0NS1iYTQ3MjU5M2EwZmUiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJ3ZWJfYXBwIjp7InJvbGVzIjpbInVzZXJzIl19LCJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ1c2VycyJdLCJuYW1lIjoiVHXhuqVuIFbFqSBWxINuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidHVhbnZ2QGFsYWRpbnRlY2guY28iLCJnaXZlbl9uYW1lIjoiVHXhuqVuIiwiZmFtaWx5X25hbWUiOiJWxakgVsSDbiIsImVtYWlsIjoidHVhbnZ2QGFsYWRpbnRlY2guY28ifQ.BV-oWGcluyXQp3ERqlPFayonnGIQ2P7QxkewQgeiVWli4-yxMDD8j26Nwl9iJ9WB-anual8KUWN-bph67go6qK9OmAepIqtRudjFWBO8ZWs2xA7kEjTBSmKnBijQVq-dUneoNvw7coOZ8-qK0zzUUtHw3I6pIgdBye0DllcbmS5ipuKcLMOhq9C-wqaz_cPkxrQG2ibuZAmNCbtoI7RkX7-XLntRvYYL11HneSGWjfciJFt-uKf2ISZPS4iCorKEQ7gQhVPHcyij0jHFpYWYdsGyF-ueKaLNoZQGe7w9gZ-O9OwBs2Wcl1XGo7L7kbKdUArrZ6MBPWLetlm7lTnPNA',
};
